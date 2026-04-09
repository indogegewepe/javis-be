import type { Request, Response } from "express";
import type { AuthUser } from "../types/auth";
import { verifyAccessToken } from "../utils/jwt";

export function authMiddleware(req: Request, res: Response, next: Function) {
  const cookieToken = req.cookies?.access_token as string | undefined;
  const authHeader = req.header("authorization");
  const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;
  const token = cookieToken || headerToken;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const payload = verifyAccessToken(token);
    (req as Request & { authUser?: AuthUser }).authUser = payload;
    next();
  } catch {
    return res.status(401).json({ message: "Token tidak valid" });
  }
}