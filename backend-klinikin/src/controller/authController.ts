import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const SECRETKEY = process.env.JWT_SECRET!;
const prisma = new PrismaClient();


export async function registerPatient(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const patient = await prisma.patient.create({
      data: { email, password: hashed, name },
    });

    res.status(201).json({ message: "Registrasi berhasil", patient });
  } catch (err) {
    res.status(500).json({ message: "Gagal registrasi pasien" });
  }
}

export async function loginPatient(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;
  const patient = await prisma.patient.findUnique({ where: { email } });

  if (!patient) return res.status(400).json({ message: "Email tidak ditemukan" });

  const match = await bcrypt.compare(password, patient.password);
  if (!match) return res.status(400).json({ message: "Password salah" });

  if (!SECRETKEY) {
    return res.status(500).json({ message: "JWT secret key is not defined" });
  }
  const token = jwt.sign({ id: patient.id }, SECRETKEY, { expiresIn: "1d" });
  res.json({ message: "Login berhasil", token });
}


export async function registerClinic(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name, address, location } = req.body;
      const hashed = await bcrypt.hash(password, 10);
  
      const clinic = await prisma.clinic.create({
        data: {
          email,
          password: hashed,
          name,
          address,
          location,
        },
      });
  
      res.status(201).json({ message: "Registrasi klinik berhasil", clinic });
    } catch (err) {
      res.status(500).json({ message: "Gagal registrasi klinik" });
    }
  }
  
  export async function loginClinic(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    const clinic = await prisma.clinic.findUnique({ where: { email } });
  
    if (!clinic) return res.status(400).json({ message: "Email tidak ditemukan" });
  
    const match = await bcrypt.compare(password, clinic.password);
    if (!match) return res.status(400).json({ message: "Password salah" });
  
    const token = jwt.sign({ id: clinic.id }, SECRETKEY, { expiresIn: "1d" });
    
    res.json({ message: "Login berhasil", token });
  }
  
export async function logout(req: Request, res: Response) {
    try {
        res.clearCookie("token");
        res.status(200).json({
            status: "success",
            message: "Logout berhasil",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}