import { pool } from "../db/db";

export async function createCanvasSlides(
  userId: string,
  object: Record<string, unknown>,
) {
  const query = `INSERT INTO canvas_slides (user_id, canvas_object) VALUES ($1, $2) RETURNING *`;

  const result = await pool.query(query, [userId, object]);

  return result.rows[0];
}
