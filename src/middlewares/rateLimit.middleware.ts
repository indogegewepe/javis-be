import rateLimit from "express-rate-limit";

export const loginRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		message: "Terlalu banyak percobaan login dari IP ini. Coba lagi nanti.",
	},
});
