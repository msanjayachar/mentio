import { Pool } from "pg";
import "dotenv/config";

console.log("DATABASE_URL: ", process.env.DATABASE_URL);

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to postgres");
});
