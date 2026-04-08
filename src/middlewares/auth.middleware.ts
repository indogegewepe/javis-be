import type { Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";

export function authMiddleware(req: Request, res: Response, next: Function) {
  const token = req.cookies?.access_token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = verifyAccessToken(token);
    req.cookies.access_token = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token tidak valid" });
  }
}