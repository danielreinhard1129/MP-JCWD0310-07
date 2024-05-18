import { hashPassword } from "@/lib/bcrypt";
import { generateRefferalCode } from "@/lib/generateReferralCode";
import prisma from "@/prisma";

interface Register {
  fullName: string;
  email: string;
  password: string;
  reff?: string;
  referralCode?: string;
  role: string;
}

export const register = async (body: Register) => {
  try {
    const { fullName, email, password, reff, role } = body;

    const { code } = generateRefferalCode();

    const today = new Date();
    const updateDate = new Date(
      today.setMonth(today.setMonth(today.getMonth() + 3)),
    );

    const hashedPassword = await hashPassword(password);
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      throw new Error("Email already exist");
    }

    const userNew = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          referralCode: code,
          role: "client",
        },
      });

      if (reff) {
        const today = new Date();
        const expirationDate = new Date(today.setMonth(today.getMonth() + 3));

        const reffOwner = await prisma.user.findFirst({
          where: { referralCode: reff },
        });

        console.log(reffOwner);
        if (reffOwner) {
          await prisma.point.updateMany({
            where: {
              userId: reffOwner.id,
            },
            data: {
              total: {
                increment: 10000,
              },
              expiredAt: expirationDate
            },
          });

          await prisma.reward.create({
            data: {
              userId: user.id, 
              rewards: 10, 
            },
          });
        }
      }

      await prisma.point.create({
        data: {
          userId: user.id,
          total: 0,
        },
      });

      return user;
    });
    return {
      message: "success reg",
      data: userNew,
    };
  } catch (error) {
    throw error;
  }
};
