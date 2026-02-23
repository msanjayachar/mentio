import { pool } from "../db/db";

export function createMcqSlides(
  question: string,
  options: string,
  correct_answers: string,
  allow_multiple: boolean,
) {
  const query = `INSERT INTO mcq_questions (question, options, correct_answers, allow_multiple) VALUES ($1, $2, $3, $4) RETURNING *;`;

  return pool.query(query, [
    question,
    JSON.stringify(options),
    JSON.stringify(correct_answers),
    allow_multiple,
  ]);
}

export async function getMcqSlidesById(slidesId: string) {
  const query = `SELECT id, question, options, correct_answers, allow_multiple from mcq_slide WHERE id = ($1);`;

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
