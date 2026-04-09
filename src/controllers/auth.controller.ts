import type { Request, Response } from "express";
import { ZodError } from "zod";
import type { LoginInput } from "../types/auth";
import { loginSchema } from "../validators/auth.validator";
import { loginUser } from "../services/auth.service";
import { signAccessToken } from "../utils/jwt";
import { loginRateLimiter } from "../middlewares/rateLimit.middleware";

const isProduction = process.env.NODE_ENV === "production";
const shouldSetCookie = process.env.AUTH_SET_COOKIE !== "false";
const cookieSameSite: "none" | "lax" = isProduction ? "none" : "lax";

export async function loginController(req: Request, res: Response): Promise<void> {
	try {
		const payload: LoginInput = loginSchema.parse(req.body);
		const user = await loginUser(payload);

		if (!user) {
			const rateLimitInfo = req as Request & {
				rateLimit?: {
					remaining: number;
					limit: number;
					resetTime?: Date;
				};
			};

			const attemptsRemaining = Math.max(rateLimitInfo.rateLimit?.remaining ?? 0, 0);
			const resetTime =
				rateLimitInfo.rateLimit?.resetTime instanceof Date
					? Math.max(Math.ceil((rateLimitInfo.rateLimit.resetTime.getTime() - Date.now()) / 1000), 0)
					: 0;

			res.status(401).json({
				message: "Email/Username atau password salah",
				attemptsRemaining,
				resetTime,
			});
			return;
		}

		if (req.ip) {
			loginRateLimiter.resetKey(req.ip);
		}


		const token = signAccessToken({
			id: user.id,
			username: user.username,
			email: user.email,
		});

		if (shouldSetCookie) {
			res.cookie("access_token", token, {
				httpOnly: true,
				secure: isProduction,
				sameSite: cookieSameSite,
				maxAge: 24 * 60 * 60 * 1000,
				path: "/",
			});
		}

		res.status(200).json({
			message: "Login berhasil",
			user,
			access_token: token,
			token_type: "Bearer",
			expires_in: 24 * 60 * 60,
		});
	} catch (error) {
		if (error instanceof ZodError) {
			res.status(400).json({ message: error.issues[0].message });
			return;
		}
		res.status(500).json({ message: "Terjadi kesalahan pada server" });
	}
}

export function logoutController(_req: Request, res: Response) {
  res.clearCookie("access_token", {
		httpOnly: true,
		secure: isProduction,
		sameSite: cookieSameSite,
		path: "/",
  });
  res.status(200).json({ message: "Logout berhasil" });
}