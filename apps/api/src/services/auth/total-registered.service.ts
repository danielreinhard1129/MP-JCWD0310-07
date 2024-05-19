import prisma from "@/prisma";
import { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
    if (req.method !== 'GET') {
      res.status(405).end(); 
      return;
    }
  
    try {
      const totalRegistered = await prisma.user.count(); 
    } catch (error) {
      console.error("Failed to fetch total registered users:", error);
      res.status(500).json({ error: 'Failed to fetch total registered users' });
    } finally {
      await prisma.$disconnect();
    }
  }