import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

export async function updateClinic(req: Request, res: Response): Promise<any> {
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

    // Validasi ID klinik
    if (!id || id !== (req as any).clinic?.id) {
        return res.status(403).json({
            status: "error",
            message: "Unauthorized to update this clinic"
        });
    }

    try {
        // Validasi input
        if (!name || !address || !location) {
            return res.status(400).json({
                status: "error",
                message: "Name, address, and location are required"
            });
        }

        // Validasi specializationIds
        if (specializationIds && Array.isArray(specializationIds)) {
            const existingSpecializations = await prisma.specialization.findMany({
                where: { id: { in: specializationIds } }
            });

            if (existingSpecializations.length !== specializationIds.length) {
                const missingIds = specializationIds.filter(
                    id => !existingSpecializations.some(sp => sp.id === id)
                );
                return res.status(400).json({
                    status: "error",
                    message: `Specializations not found: ${missingIds.join(", ")}`
                });
            }
        }

        const data = await prisma.clinic.update({
            where: { id },
            data: {
                name,
                address,
                location,
                acceptsBPJS: Boolean(acceptsBPJS),
                specialization: specializationIds ? {
                    set: specializationIds.map((id: any) => ({ id }))
                } : undefined,
                description,
                whatsappLink,
                images
            },
            include: {
                specialization: true
            }
        });

        res.status(200).json({
            status: "success",
            message: "Clinic updated successfully",
            data
        });

    } catch (error) {
        console.error("Error updating clinic:", error);
        
        // Handle Prisma known errors
        if (error instanceof Error && error.message.includes("RecordNotFound")) {
            return res.status(404).json({
                status: "error",
                message: "Clinic not found"
            });
        }

        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

export async function myClinicProfile(req: Request, res: Response): Promise<any> {
    try {
        const clinicId = (req as any).clinic?.id;
        
        if (!clinicId) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized - Clinic ID not found"
            });
        }

        const clinic = await prisma.clinic.findUnique({
            where: { id: clinicId },
            include: {
                specialization: true
            }
        });

        if (!clinic) {
            return res.status(404).json({
                status: "error",
                message: "Clinic not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Clinic profile retrieved successfully",
            data: clinic
        });

    } catch (error) {
        console.error("Error fetching clinic profile:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}

export async function uploadClinicImage(req: Request, res: Response): Promise<any> {
  try {
    const clinicId = (req as any).clinic.id;

    if (!req.file) {
      return res.status(400).json({ message: "File tidak ditemukan" });
    }

    const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

    const update = await prisma.clinic.update({
      where: { id: clinicId },
      data: { images: imageUrl },
    });

    res.status(200).json({
      message: "Foto berhasil diunggah",
      data: {"url": imageUrl},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal upload foto" });
  }
}
