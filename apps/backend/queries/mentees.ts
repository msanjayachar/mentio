import { pool } from "../db/db";

export async function createMentee(presentationId: string) {
  const query = `INSERT INTO mentees (presentation_id) VALUES ($1) RETURNING id, presentation_id, created_at`;

  const result = await pool.query(query, [presentationId]);

  return result.rows[0];
}
