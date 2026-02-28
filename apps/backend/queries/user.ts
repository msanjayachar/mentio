import { pool } from "../db/db";

export const createUser = async (
  email: string,
  name: string,
  password: string,
) => {
  const query = `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *;`;

  const result = await pool.query(query, [email, name, password]);

  return result.rows[0];
};

export const getUser = async (email: string) => {
  const query = `SELECT * FROM users WHERE email = $1`;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};

export const getUserByUserId = async (userId: string) => {
  const query = `SELECT * FROM users WHERE id = $1`;

  const result = await pool.query(query, [userId]);

  return result.rows[0];
};
