import prisma from "@/prisma";
import cron from "node-cron";

interface CreateTransactionBody {
  amount: number;
  eventId: number;
  userId: number;
  total: number;
  transactionId: number;
  status: string;
}

export const updateTransactionService = async (body: CreateTransactionBody) => {
  try {
    const { eventId, userId, transactionId, status } = body;

    const event = await prisma.event.findFirst({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const transaction = await prisma.transaction.findFirst({
      where: { id: transactionId },
      include: { user: { include: { points: true } } },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const updatedTransaction = await prisma.$transaction(async (prisma) => {
      const newTransaction = await prisma.transaction.update({
        where: { id: transactionId },
        data: { status },
      });

      if (status === "Cancelled") {
        await prisma.event.update({
          where: { id: eventId },
          data: {
            stock: {
              increment: transaction.amount,
            },
            booked: {
              decrement: transaction.amount,
            },
          },
        });
      }

      return newTransaction;
    });

    return updatedTransaction;
  } catch (error) {
    throw error;
  }
};

cron.schedule("*/5 * * * *", async () => {
  try {
    const cancelledTransactions = await prisma.transaction.findMany({
      where: {
        status: "Cancelled",
      },
      include: { user: { include: { points: true } } },
    });

    for (const transaction of cancelledTransactions) {
      const { eventId, amount } = transaction;

      await prisma.event.update({
        where: { id: eventId },
        data: {
          stock: {
            increment: amount,
          },
          booked: {
            decrement: amount,
          },
        },
      });
    }

    console.log("Cron job executed successfully");
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});
