import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRETKEY = process.env.JWT_SECRET as string || "secret";

export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Access Denied" });
        return;
    }
    try {
        const verified = jwt.verify(token, SECRETKEY);
        (req as any).user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
}