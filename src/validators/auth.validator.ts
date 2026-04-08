import { z } from "zod";

export const loginSchema = z.object({
	identifier: z
		.string()
		.trim()
		.min(1, "username/email wajib diisi")
		.min(3, "username/email minimal 3 karakter")
		.max(100, "username/email maksimal 100 karakter"),
	password: z
		.string()
		.min(1, "password wajib diisi")
		.min(6, "password minimal 6 karakter")
		.max(255, "password maksimal 255 karakter"),
});
