import { pool } from "../db/db";

export async function createCanvasSlides(
  userId: string,
  presentationId: string,
  object: Record<string, unknown>,
) {
  const query = `INSERT INTO canvas_slides (user_id, presentation_id, canvas_object) VALUES ($1, $2, $3) RETURNING id, canvas_object, presentation_id, created_at`;

  const result = await pool.query(query, [userId, presentationId, object]);

  return result.rows[0];
}

export async function getCanvasSlides(userId: string) {
  const query = `SELECT id, canvas_object, presentation_id, created_at FROM canvas_slides WHERE user_id = ($1);`;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

export async function getCanvasSlide(canvasSlideId: string, userId: string) {
  const query = `SELECT id, canvas_object, presentation_id, created_at FROM canvas_slides WHERE id = $1 AND user_id = $2;`;

  const result = await pool.query(query, [canvasSlideId, userId]);

  return result.rows[0];
}

export async function updateCanvasSlides(
  id: string,
  userId: string,
  canvasObject: Object,
) {
  const query = `UPDATE canvas_slides SET canvas_object = $3 WHERE user_id = $2 AND id = $1 RETURNING id, canvas_object, presentation_id, created_at;`;
  const result = await pool.query(query, [id, userId, canvasObject]);

  return result.rows[0];
}
