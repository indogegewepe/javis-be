import bcrypt from "bcrypt";
import supabase from "../config/db";
import type { AuthUser, AuthUserRow, LoginInput } from "../types/auth";

export async function loginUser(payload: LoginInput): Promise<AuthUser | null> {
	const identifier = payload.identifier.trim();

	const { data: rows, error } = await supabase
		.from("users")
		.select("id, email, username, password")
		.or(`email.eq.${identifier},username.eq.${identifier}`)
		.limit(1);

	if (error) {
		console.error("Database query error:", error);
		return null;
	}

	const user = rows?.[0] as AuthUserRow | undefined;
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
