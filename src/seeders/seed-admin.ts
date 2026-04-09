import bcrypt from "bcrypt";
import supabase from "../config/db";

async function seedAdminUser(): Promise<void> {
  const username = "Admin";
  const email = "admin123@admin.com";
  const plainPassword = "admin1234";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    const { error } = await supabase
      .from("users")
      .update({
        username,
        email,
        password: hashedPassword,
      })
      .eq("id", existingUser.id);

    if (error) {
      throw error;
    }
  } else {
    const { error } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password: hashedPassword,
        },
      ]);

    if (error) {
      throw error;
    }
  }
  console.log("Admin user seeded successfully.");
}

seedAdminUser()
  .catch((error) => {
    console.error("Failed to seed admin user:", error);
    process.exitCode = 1;
  })
