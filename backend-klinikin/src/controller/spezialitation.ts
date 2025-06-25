import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getSpecializations(req: Request, res: Response) {
  try {
    const specializations = await prisma.specialization.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    res.status(200).json({
      message: "Berhasil mendapatkan daftar spesialisasi",
      data: specializations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function addSpecialization(req: Request, res: Response) {
  const { name } = req.body;

  try {
    const existingSpecialization = await prisma.specialization.findUnique({
      where: { name },
    });

    if (existingSpecialization) {
      return res.status(400).json({
        status: "error",
        message: "Spesialisasi sudah ada",
      });
    }

    const newSpecialization = await prisma.specialization.create({
      data: { name },
    });

    res.status(201).json({
      message: "Spesialisasi berhasil ditambahkan",
      data: newSpecialization,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}