import bcrypt from "bcrypt";
import pool from "../config/db";

async function seedAdminUser(): Promise<void> {
  const username = "Admin";
  const email = "admin123@admin.com";
  const plainPassword = "admin1234";

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await pool.query(
    `
      INSERT INTO users (username, email, password)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
        username = VALUES(username),
        email = VALUES(email),
        password = VALUES(password)
    `,
    [username, email, hashedPassword]
  );

  console.log("Admin user seeded successfully.");
}

seedAdminUser()
  .catch((error) => {
    console.error("Failed to seed admin user:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
