import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const SECRETKEY = process.env.JWT_SECRET!;
const prisma = new PrismaClient();

// Helper untuk set cookie
const setAuthCookie = (res: Response, token: string) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000, // 1 hari
    path: '/',
  });
};

export async function registerPatient(req: Request, res: Response): Promise<any> {
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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password harus diisi" });
    }

    const patient = await prisma.patient.findUnique({ where: { email } });

    if (!patient) return res.status(400).json({ message: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, patient.password);
    if (!match) return res.status(400).json({ message: "Password salah" });

    if (!SECRETKEY) {
      return res.status(500).json({ message: "JWT secret key is not defined" });
    }

    const token = jwt.sign({ id: patient.id }, SECRETKEY, { expiresIn: "1d" });
    //debug
    console.log("Generated JWT Token:", token);
    setAuthCookie(res, token);
    res.status(200).json({ message: "Login berhasil" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
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
  //debug
  console.log("Generated JWT Token:", token);
  setAuthCookie(res, token);
  res.json({ message: "Login berhasil" });
}

// authController.ts
export async function authCheck(req: Request, res: Response): Promise<any> {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(200).json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(token, SECRETKEY) as { id: string };
    const user = await prisma.patient.findUnique({ 
      where: { id: decoded.id },
      select: { id: true }
    });

    if (!user) {
      return res.status(200).json({ isAuthenticated: false });
    }

    return res.status(200).json({ isAuthenticated: true });
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(200).json({ isAuthenticated: false });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      path: '/',
    });
    res.status(200).json({
      status: "success",
      message: "Logout berhasil",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
}

