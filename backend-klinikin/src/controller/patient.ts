import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function myPatientProfile(req: Request, res: Response): Promise<any> {
  try {
    const patientId = (req as any).user.id;

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        reviews: true,
        appointments: true,
      },
    });

    if (!patient) {
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    }

    res.status(200).json({
      message: "Profile pasien berhasil diambil",
      data: patient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}

export async function updatePatientProfile(req: Request, res: Response): Promise<any> {
  try {
    const patientId = (req as any).user.id;
    const {name} = req.body;
    const updatedPatient = await prisma.patient.update({
      where: { id: patientId },
      data: {
        name,
      },
    })
    res.status(200).json({
      message: "Profile pasien berhasil diperbarui",
      data: updatedPatient,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
}