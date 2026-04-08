import type { Request, Response } from "express";

export async function userController(req: Request, res: Response): Promise<void> {
	try {
    if (!req.cookies.access_token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.status(200).json({ user: req.cookies.access_token });
	} catch (error) {
		res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
}