import rateLimit from "express-rate-limit";

const LOGIN_RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;

export const loginRateLimiter = rateLimit({
	windowMs: LOGIN_RATE_LIMIT_WINDOW_MS,
	max: 5,
	standardHeaders: true,
	legacyHeaders: false,
	handler: (req, res, _next, options) => {
		const requestWithRateLimit = req as typeof req & {
			rateLimit?: {
				resetTime?: Date;
			};
		};

		const resetMs =
			requestWithRateLimit.rateLimit?.resetTime instanceof Date
				? requestWithRateLimit.rateLimit.resetTime.getTime() - Date.now()
				: LOGIN_RATE_LIMIT_WINDOW_MS;

		const resetTime = Math.max(Math.ceil(resetMs / 1000), 0);

		res.status(options.statusCode).json({
			message: "Terlalu banyak percobaan login dari IP ini. Coba lagi nanti.",
			attemptsRemaining: 0,
			resetTime,
		});
	},
});
