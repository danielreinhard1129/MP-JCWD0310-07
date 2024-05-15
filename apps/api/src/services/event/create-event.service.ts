import prisma from "@/prisma";
import { Event } from "@prisma/client";

interface CreateEventBody
  extends Omit<Event, "deletedAt" | "createdAt" | "updatedAt" | "thumbnail"> {}

export const createEventService = async (
  body: CreateEventBody,
  file: Express.Multer.File,
) => {
  try {
    const { startEvent, endEvent, price, isFree, title, userId, stock } = body;

    const existingTitle = await prisma.event.findFirst({
      where: { title },
    });

    if (existingTitle) {
      throw new Error("Event already in use");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(userId) },
    });

    if (user?.role !== "organizer") {
      throw new Error("User does not have permission to create an event");
    }

    if (!user) {
      throw new Error("User not found");
    }

    return await prisma.event.create({
      data: {
        ...body,
        startEvent: new Date(startEvent),
        endEvent: new Date(endEvent),
        stock: Number(stock),
        price: Number(price),
        isFree: Boolean(isFree),
        thumbnail: `/images/${file.filename}`,
        userId: Number(userId),
      },
    });
  } catch (error) {
    throw error;
  }
};
