import { pool } from "../db/db";

export const createUser = async (
  email: string,
  name: string,
  password: string,
  role: string,
) => {
  const query = `INSERT INTO users (email, name, password, role) VALUES ($1, $2, $3, $4) RETURNING *;`;

  const result = await pool.query(query, [email, name, password, role]);

  return result.rows[0];
};

export const getUser = async (email: string) => {
  const query = `SELECT * FROM users WHERE email = $1`;

  const result = await pool.query(query, [email]);

  console.log("*************************");
  console.log("result.rows: ", result.rows);
  console.log("*************************");

  return result.rows[0];
};
