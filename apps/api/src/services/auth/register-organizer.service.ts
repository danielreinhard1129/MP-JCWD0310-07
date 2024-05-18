
import { hashPassword } from "@/lib/bcrypt";
import prisma from "@/prisma";

interface RegisterOrganizerProps {
  fullName: string;
  email: string;
  password: string;
  role: string;
  referralCode: string;
}

export const registerOrganizerService = async (
  body: Pick<
    RegisterOrganizerProps,
    "email" | "fullName" | "password" | "referralCode" | "role"
  >,
) => {
  try {
    const { email, password } = body;

    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      throw new Error("Email already exist");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: { ...body, password: hashedPassword },
    });
    return {
      message: "Register success",
      data: newUser,
    };
  } catch (error) {
    throw error;
  }
};
