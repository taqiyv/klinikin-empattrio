import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const SECRETKEY = process.env.JWT_SECRET;

const prisma = new PrismaClient();

export async function getAllClinic(req: Request, res: Response) {
  try {
    const data = await prisma.clinic.findMany({
      include: {
        _count: {
          select: {
            reviews: true,
          },
        }, specialization: true
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data semua klinik",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getOneClinic(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await prisma.clinic.findUnique({
      where: {
        id: id,
      },
      include: {
        specialization: true,
        reviews: {
          include: {
            patient: {
              select: {
                name: true,
              }
            }
          }
        }
      }
    });

    res.status(200).json({
      status: "success",
      message: "Data klinik",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function updateClinic(req: Request, res: Response) {
  const { id } = req.params;
  const {
    name,
    address,
    location,
    acceptsBPJS,
    specializationIds,
    description,
    whatsappLink,
    images,
  } = req.body;
  try {
    const data = await prisma.clinic.update({
        where: { id: id },
        data: {
            name: name,
            address: address,
            location: location,
            acceptsBPJS: acceptsBPJS,
            specialization: {
                set: await Promise.all(
                  specializationIds.map(async (id: string) => {
                    const specialization = await prisma.specialization.findUnique({ where: { id } });
                    if (!specialization) {
                      throw new Error(`Specialization with ID ${id} does not exist`);
                    }
                    return { id };
                  })
                )
            },
            description: description,
            whatsappLink: whatsappLink,
            images: images
        }
    })
    res.status(200).json({
      status: "success",
      message: "Update klinik berhasil",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getMyClinicProfile(req: Request, res: Response): Promise<any> {
  const clinicId = (req as any).user.id;
  try {
    const clinic = await prisma.clinic.findUnique({
      where: { id: clinicId },
      include: {
        specialization: true,
        appointments: true,
        Article: true,
        reviews: true,
        statistics: true
      }
    });
    if (!clinic) {
      return res.status(404).json({
        status: "error",
        message: "Clinic not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Clinic profile",
      data: clinic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getAllArticles(req: Request, res: Response) {
  try {
    const data = await prisma.article.findMany();

    res.status(200).json({
      status: "success",
      message: "Data semua artikel",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}

export async function getMyProfilPatient(req: Request, res: Response): Promise<any> {
  const patientId = (req as any).user.id;
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        appointments: true,
      }
    });
    if (!patient) {
      return res.status(404).json({
        status: "error",
        message: "Patient not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Patient profile",
      data: patient,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
