import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();


const prisma = new PrismaClient();

export async function updateClinic(req: Request, res: Response): Promise<void> {
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

  export async function myClinicProfile(req: Request, res: Response): Promise<any> {
    try {
      const clinicId = (req as any).clinic.id;  
      const clinic = await prisma.clinic.findUnique({
        where: { id: clinicId },
      });
  
      if (!clinic) {
        console.log(" Klinik tidak ditemukan di database.");
        return res.status(404).json({ message: "Klinik tidak ditemukan", id: clinicId });
      }
  
      res.status(200).json({
        status: "success",
        message: "Profile klinik berhasil diambil",
        data: clinic,
      });
    } catch (error) {
      console.error(" ERROR:", error);
      res.status(500).json({ message: "Terjadi kesalahan server" });
    }
  }
  