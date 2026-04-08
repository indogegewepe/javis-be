export interface LoginInput {
	identifier: string;
	password: string;
}

export interface AuthUser {
	id: number;
	email: string | null;
	username: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface AuthUserRow extends AuthUser {
	password: string;
}