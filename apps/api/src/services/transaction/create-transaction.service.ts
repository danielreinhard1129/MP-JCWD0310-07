import prisma from "@/prisma";
import { Transaction } from "@prisma/client";
import { scheduleJob } from "node-schedule";

interface CreateTransactionBody
  extends Omit<Transaction, "createdAt" | "updatedAt" | "id"> {
  userVoucherId: number | null;
  referralCode: string | null;
}

export const createTransactionService = async (body: CreateTransactionBody) => {
  try {
    const {
      userId,
      eventId,
      amount,
      status,
      total,
      isPointUse,
      isUseVoucher,
      userVoucherId,
      referralCode,
    } = body;

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
      include: { points: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const event = await prisma.event.findFirst({
      where: { id: Number(eventId) },
    });

    if (!event || event.stock < amount) {
      throw new Error("Event not found or insufficient stock available");
    }

    if (referralCode) {
      const referredUser = await prisma.user.findFirst({
        where: { referralCode },
      });

      if (referredUser) {
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);

        const existingReward = await prisma.reward.findFirst({
          where: {
            userId: referredUser.id,
          },
        });

        if (!existingReward) {
          await prisma.reward.create({
            data: {
              userId: referredUser.id,
              rewards: 100,
              expiredDate: expiryDate,
            },
          });
        }
      }
    }

    if (userVoucherId) {
      await prisma.userVoucher.update({
        where: { id: userVoucherId },
        data: { isUse: true },
      });
    }

    const newTransaction = await prisma.$transaction(async (prisma) => {
      let pointsToDecrement = 0;
      if (isPointUse && user.points) {
        user.points.forEach((point) => {
          pointsToDecrement += point.total || 0;
        });
      }

      const createdTransaction = await prisma.transaction.create({
        data: {
          userId: Number(userId),
          eventId: Number(eventId),
          amount: Number(amount),
          total,
          status,
          isPointUse: Boolean(isPointUse),
          isUseVoucher: Boolean(isUseVoucher),
          userVoucherId: userVoucherId || null,
        },
        include: { event: true, user: true },
      });

      if (pointsToDecrement > 0) {
        await prisma.point.updateMany({
          where: {
            userId: Number(userId),
          },
          data: {
            total: 0,
          },
        });
      }

      const updatedEvent = await prisma.event.update({
        where: { id: Number(eventId) },
        data: {
          stock: {
            decrement: amount,
          },
          booked: {
            increment: amount,
          },
        },
      });

      console.log("Updated event:", updatedEvent);

      return createdTransaction;
    });

    // Schedule job for 2 hours
    const twoHoursLater = new Date(Date.now() + 2 * 60 * 60 * 1000);
    scheduleJob("run every", twoHoursLater, async () => {
      try {
        const transaction = await prisma.transaction.findFirst({
          where: {
            id: newTransaction.id,
            status: "Pending",
          },
        });

        if (!transaction) {
          return;
        }

        if (transaction.isPointUse && user.points) {
          const updatedPoints = [];
          for (const point of user.points) {
            const newTotal = point.total + transaction.amount;
            const updatedPoint = await prisma.point.update({
              where: { id: point.id },
              data: { total: newTotal },
            });
            updatedPoints.push(updatedPoint);
          }

          await prisma.user.update({
            where: { id: transaction.userId },
            data: {
              points: { set: updatedPoints.map((point) => ({ id: point.id })) },
            },
          });
        }

        await prisma.transaction.update({
          where: { id: transaction.id },
          data: { status: "Expired" },
        });

        const { referralCode } = body;

        if (referralCode) {
          const referredUser = await prisma.user.findFirst({
            where: { referralCode: referralCode },
          });

          if (referredUser) {
            await prisma.reward.deleteMany({
              where: {
                userId: referredUser.id,
              },
            });
          }
        }

        await prisma.event.update({
          where: { id: transaction.eventId },
          data: {
            stock: {
              increment: transaction.amount,
            },
            booked: {
              decrement: transaction.amount,
            },
          },
        });
      } catch (error) {
        console.error("Error during 2-hour scheduler execution:", error);
      }
    });

    // Schedule job for 1 day later
    const oneDayLater = new Date(Date.now() + 24 * 60 * 60 * 1000);
    scheduleJob("run every", oneDayLater, async () => {
      try {
        const transaction = await prisma.transaction.findFirst({
          where: {
            id: newTransaction.id,
            status: "Waiting Admin",
          },
        });

        if (!transaction) {
          return;
        }

        if (transaction.isPointUse && user.points) {
          const updatedPoints = [];
          for (const point of user.points) {
            const newTotal = point.total + transaction.amount;
            const updatedPoint = await prisma.point.update({
              where: { id: point.id },
              data: { total: newTotal },
            });
            updatedPoints.push(updatedPoint);
          }

          await prisma.user.update({
            where: { id: transaction.userId },
            data: {
              points: { set: updatedPoints.map((point) => ({ id: point.id })) },
            },
          });
        }

        await prisma.transaction.update({
          where: { id: transaction.id },
          data: { status: "Cancelled" },
        });

        await prisma.event.update({
          where: { id: transaction.eventId },
          data: {
            stock: {
              increment: transaction.amount,
            },
            booked: {
              decrement: transaction.amount,
            },
          },
        });
      } catch (error) {
        console.error("Error during 1-day scheduler execution:", error);
      }
    });

    return newTransaction;
  } catch (error) {
    throw error;
  }
};
