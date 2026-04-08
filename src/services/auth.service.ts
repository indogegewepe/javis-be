import bcrypt from "bcrypt";
import type { RowDataPacket } from "mysql2";
import pool from "../config/db";
import type { AuthUser, AuthUserRow, LoginInput } from "../types/auth";

type LoginUserRow = RowDataPacket & AuthUserRow;

export async function loginUser(payload: LoginInput): Promise<AuthUser | null> {
	const identifier = payload.identifier.trim();

	const [rows] = await pool.query<LoginUserRow[]>(
		`
			SELECT id, email, username, password
			FROM users
			WHERE BINARY email = ? OR BINARY username = ?
			LIMIT 1
		`,
		[identifier, identifier]
	);

	const user = rows[0];
	if (!user) {
		return null;
	}

	const isPasswordValid = await bcrypt.compare(payload.password, user.password);
	if (!isPasswordValid) {
		return null;
	}

	return {
		id: user.id,
		email: user.email,
		username: user.username,
	};
}
