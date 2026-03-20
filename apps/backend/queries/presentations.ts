import { pool } from "../db/db";

export const createPresentation = async (userId: string, title: string) => {
  const query =
    "INSERT INTO presentations (user_id, title) VALUES ($1, $2) RETURNING *";

  const result = await pool.query(query, [userId, title]);

  return result.rows[0];
};

export const getPresentations = async (userId: string) => {
  const query = "SELECT * FROM presentations WHERE user_id = $1";

  const result = await pool.query(query, [userId]);

  return result.rows;
};

export const getPresentationById = async (id: string, userId: string) => {
  const query = "SELECT * FROM presentations WHERE id = $1 AND user_id = $2";

  const result = await pool.query(query, [id, userId]);

  return result.rows[0];
};

export const updatePresentationTitle = async (
  id: string,
  title: string,
  userId: string,
) => {
  const query =
    "UPDATE presentations SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *";

  const result = await pool.query(query, [title, id, userId]);

  return result.rows[0];
};

export const startPresentation = async (
  id: string,
  title: string,
  userId: string,
) => {
  const query =
    "UPDATE presentations SET started_at = NOW() WHERE id = $1 AND title = $2 AND user_id = $3 RETURNING *";

  const result = await pool.query(query, [id, title, userId]);

  return result.rows[0];
};
