import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export async function createAppointment(req: Request, res: Response) {
  const patientId = (req as any).user.id;
  const { clinicId } = req.body;

  try {
    const appointment = await prisma.appointment.create({
      data: {
        clinicId,
        patientId,
        status: "Pending",
      },
    });

    res.status(201).json({
      message: "Appointment berhasil dibuat",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getMyAppointments(req: Request, res: Response) {
  const patientId = (req as any).user.id;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId,
      },
      include: {
        patient: {
          select: {
            name: true,
          },
        }, clinic: {
          select: {
            name: true,
            address: true,
            whatsappLink: true
          },
        }
      },
    });
    res.status(200).json({
      message: "Berhasil mendapatkan daftar appointment",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getClinicAppointments(req: Request, res: Response) {
  const clinicId = (req as any).clinic.id;

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        clinicId,
      },
      include: {
        patient: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Berhasil mendapatkan daftar appointment",
      data: appointments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function updateAppointmentStatus(req: Request, res: Response) {
  const { appointmentId } = req.params;
  const { status } = req.body;

  try {
    const appointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      message: "Status appointment berhasil diperbarui",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

