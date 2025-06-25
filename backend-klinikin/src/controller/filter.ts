import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function filterClinics(req: Request, res: Response) {
  const { name, location, specialization, acceptsBPJS, minRating } = req.query;

  try {
    const bpjsFilter = acceptsBPJS ? acceptsBPJS === 'true' : undefined;
    const ratingFilter = minRating ? parseFloat(String(minRating)) : undefined;
    const specializationNames = specialization 
      ? Array.isArray(specialization) 
        ? specialization.map(s => String(s))
        : [String(specialization)]
      : undefined;

    const clinics = await prisma.clinic.findMany({
      where: {
        AND: [
          name
            ? { name: { contains: String(name), } }
            : {},
          location
            ? { location: { contains: String(location), } }
            : {},
          bpjsFilter !== undefined
            ? { acceptsBPJS: bpjsFilter }
            : {},
          ratingFilter !== undefined
            ? { rating: { gte: ratingFilter } }
            : {},
          specializationNames
            ? {
                specialization: {
                  some: {
                    name: { in: specializationNames },
                  },
                },
              }
            : {},
        ].filter((c) => Object.keys(c).length > 0),
      },
      include: {
        specialization: {
          select: { name: true },
        },
        _count: {
          select: {
            reviews: true,
            appointments: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Berhasil mendapatkan daftar klinik",
      data: clinics,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
}
