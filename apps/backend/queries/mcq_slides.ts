import { pool } from "../db/db";

export async function createMcqSlides(
  userId: string,
  question: string,
  options: string[],
  correctAnswers: string[],
  allowMultiple: boolean,
) {
  const query = `INSERT INTO mcq_slides (user_id, question, options, correct_answers, allow_multiple) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

  const result = await pool.query(query, [
    userId,
    question,
    JSON.stringify(options),
    JSON.stringify(correctAnswers),
    allowMultiple,
  ]);

  return result.rows[0];
}

export async function getMcqSlides(userId: string) {
  const query = `SELECT * FROM mcq_slides WHERE user_id = ($1);`;

  const result = await pool.query(query, [userId]);

  return result.rows;
}

export async function getMcqSlidesById(slidesId: string) {
  const query = `SELECT id, question, options, correct_answers, allow_multiple from mcq_slides WHERE id = ($1);`;

  const result = await pool.query(query, [slidesId]);

  if (!result.rows) {
    return null;
  }

  return result.rows.map((row) => ({
    id: row.id,
    question: row.question,
    options: row.options,
    correct_answers: row.correct_answers,
    allow_multiple: row.allow_multiple,
  }));
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
  question: string,
  options: string[],
  correctAnswers: string[],
  allowMultiple: boolean,
) {
  const query = `UPDATE mcq_slides SET question = $1, options = $2, correct_answers = $3, allow_multiple = $4 WHERE id = $5 AND user_id = $6 RETURNING *;`;

  const result = await pool.query(query, [
    question,
    JSON.stringify(options),
    JSON.stringify(correctAnswers),
    allowMultiple,
    id,
    userId,
  ]);

  return result.rows[0];
}
