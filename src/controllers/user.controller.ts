import type { Request, Response } from "express";
import type { AuthUser } from "../types/auth";

export async function userController(req: Request, res: Response): Promise<void> {
	try {
    const authUser = (req as Request & { authUser?: AuthUser }).authUser;

    if (!authUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

		res.status(200).json({ user: authUser });
	} catch (error) {
		res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
}