import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
	console.warn("Warning: SUPABASE_URL or SUPABASE_ANON_KEY is not set");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkDbConnection(): Promise<void> {
	try {
		const { data, error } = await supabase
			.from("users")
			.select("id")
			.limit(1);

		if (error) {
			throw error;
		}

		console.log("Supabase connected");
	} catch (error) {
		console.error("Supabase connection failed:", error);
	}
}

export default supabase;
