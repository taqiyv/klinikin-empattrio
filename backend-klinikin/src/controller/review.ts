import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export async function reviewClinic(req: Request, res: Response): Promise<any> {
  const { clinicId, rating, comment } = req.body;
  const patientId = (req as any).user.id;

  try {
    const clinic = await prisma.clinic.findUnique({
      where: { id: clinicId },
    });

    if (!clinic) {
      return res.status(404).json({
        status: "error",
        message: "Klinik tidak ditemukan",
      });
    }

    const review = await prisma.review.create({
      data: {
        clinicId,
        patientId,
        rating,
        comment,
      },
    });

    const allReviews = await prisma.review.findMany({
      where: { clinicId },
      select: { rating: true },
    });

    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    // Update clinic's rating field
    await prisma.clinic.update({
      where: { id: clinicId },
      data: { rating: avgRating },
    });

    res.status(201).json({
      message: "Review berhasil ditambahkan",
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getClinicReviews(req: Request, res: Response): Promise<any> {
  const clinicId = req.params.clinicId;


  if (!clinicId) {
    return res.status(400).json({
      status: "error",
      message: "clinicId param is missing",
    });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { clinicId }, // pakai parseInt(clinicId) kalau di DB integer
      include: {
        patient: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (reviews.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "Tidak ada review untuk klinik ini",
        reviews: [],
      });
    }

    res.status(200).json({
      status: "success",
      message: "Review berhasil diambil",
      reviews,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
