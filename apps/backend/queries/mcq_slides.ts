import { pool } from "../db/db";
import { McqOption } from "@shared/mcq";

export async function createMcqSlides(
  userId: string,
  question: string,
  options: McqOption[],
  allowMultiple: boolean,
  presentationId: string,
) {
  const query = `INSERT INTO mcq_slides (user_id, question, options, allow_multiple, presentation_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, question, options, allow_multiple, presentation_id, created_at
;`;

  const result = await pool.query(query, [
    userId,
    question,
    JSON.stringify(options),
    allowMultiple,
    presentationId,
  ]);

  return result.rows[0];
}

export async function getMcqSlides(userId: string) {
  const query = `SELECT id, question, options, allow_multiple, presentation_id, created_at FROM mcq_slides WHERE user_id = ($1);`;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

export async function getMcqSlideById(slidesId: string, userId: string) {
  const query = `SELECT id, question, options, allow_multiple, presentation_id, created_at from mcq_slides WHERE id = $1 AND user_id = $2;`;

  const result = await pool.query(query, [slidesId, userId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}

export async function deleteSlides(userId: string): Promise<number> {
  const query = `DELETE FROM mcq_slides WHERE user_id = $1`;
  const result = await pool.query(query, [userId]);

  return result.rowCount ?? 0;
}

export async function deleteSlidesById(
  id: string,
  userId: string,
): Promise<number> {
  const query = "DELETE FROM mcq_slides WHERE id = $1 AND user_id = $2";

  const result = await pool.query(query, [id, userId]);

  return result.rowCount ?? 0;
}

export async function updateMcqSlides(
  id: string,
  userId: string,
  question?: string,
  options?: Object[],
  allowMultiple?: boolean,
) {
  const query = `UPDATE mcq_slides SET question = $1, options = $2, allow_multiple = $3 WHERE id = $4 AND user_id = $5 RETURNING id, question, options, allow_multiple, presentation_id, created_at;`;

  const result = await pool.query(query, [
    question,
    JSON.stringify(options),
    allowMultiple,
    id,
    userId,
  ]);

  return result.rows[0];
}
