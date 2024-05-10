import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/prisma";
import { User } from "@prisma/client";
import { generateRefferalCode } from "@/lib/generateReferralCode";

interface Register {
  fullName: string;
  email: string;
  password: string;
  reff?: string;
  referralCode: string;
}

export const referralCodeService = async (body: Register) => {
  try {
    const { fullName, email, password, reff, referralCode } = body;

    const { code } = generateRefferalCode();

    const userNew = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          fullName,
          email,
          password,
          referralCode: code,
        },
      });

      if (reff) {
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
