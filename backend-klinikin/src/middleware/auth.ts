import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRETKEY = process.env.JWT_SECRET as string;

// Middleware untuk mendapatkan token dari cookie
const getTokenFromCookie = (req: Request) => {
  return req.cookies?.token;
};

export function authenticatePatient(req: Request, res: Response, next: NextFunction): any {
  const token = getTokenFromCookie(req) || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  try {
    const decoded = jwt.verify(token, SECRETKEY) as { id: string };
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
}

export function authenticateClinic(req: Request, res: Response, next: NextFunction): any {
  const token = getTokenFromCookie(req) || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  try {
    const decoded = jwt.verify(token, SECRETKEY) as { id: string };
    (req as any).clinic = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
}