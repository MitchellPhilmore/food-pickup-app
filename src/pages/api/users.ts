import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      }
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Database error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    res.status(500).json({ message: "Error connecting to the database", error: errorMessage });
  } finally {
    await prisma.$disconnect();
  }
}