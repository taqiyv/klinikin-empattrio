import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const SECRETKEY = process.env.JWT_SECRET;
const prisma = new PrismaClient();

export async function registerPatient(req: Request,res: Response) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await prisma.patient.create({
            data: {
                name: name,
                password: hashedPassword,
                email: email,
            }
        });

        res.status(200).json({
            status: "success",
            message: "Register berhasil",
            data: data
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

export async function loginPatient(req: Request,res: Response): Promise<any> {
    try {
        const { email, password } = req.body;
        const data = await prisma.patient.findUnique({
            where: {
                email: email
            }
        });

        if (!data) {
            return res.status(400).json({
                status: "error",
                message: "Email tidak ditemukan"
            })
        }

        const isValidPassword = await bcrypt.compare(password, data.password);

        if (!isValidPassword) {
            return res.status(400).json({
                status: "error",
                message: "Password salah"
            })
        }

        const jwtToken = jwt.sign({ id: data.id }, SECRETKEY as string, { expiresIn: "1d" });

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.status(200).json({
            status: "success",
            message: "Login berhasil",
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

export async function registerKlinik(req: Request, res: Response) {
    try {
        const { name, password, email, address, location } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await prisma.clinic.create({
            data: {
                name,
                password: hashedPassword,
                email,
                address,
                location,
            }
        });

        res.status(200).json({
            status: "success",
            message: "Register klinik berhasil",
            data: data
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
}

export async function loginKlinik(req: Request, res: Response): Promise<any> {
    try {
        const { email, password } = req.body;
        const data = await prisma.clinic.findUnique({
            where: {
                email: email
            }
        });

        if (!data) {
            return res.status(400).json({
                status: "error",
                message: "Email tidak ditemukan"
            })
        }

        const isValidPassword = await bcrypt.compare(password, data.password);

        if (!isValidPassword) {
            return res.status(400).json({
                status: "error",
                message: "Password salah"
            })
        }

        const jwtToken = jwt.sign({ id: data.id }, SECRETKEY as string, { expiresIn: "1d" });

        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.status(200).json({
            status: "success",
            message: "Login berhasil",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        })
    }
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