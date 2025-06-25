import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();


const prisma = new PrismaClient();

export async function getAllClinic(req: Request, res: Response) {
  try {
    const data = await prisma.clinic.findMany({
      include: {
        _count: {
          select: {
            reviews: true,
          },
        }, specialization: true,
        reviews: true,
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

export async function getOneArticle(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = await prisma.article.findUnique({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data artikel",
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

