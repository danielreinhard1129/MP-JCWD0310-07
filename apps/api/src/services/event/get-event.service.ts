import prisma from "@/prisma";

export const getBlogService = async (id: number) => {
  try {
    const event = await prisma.event.findFirst({
      where: { id },
      include: { user: true },
    });

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  } catch (error) {
    throw error;
  }
};
