import { pool } from "../../units/db.js";

export async function getUniqueIds(ids) {
  if (!ids.length) return [];

  const res = await pool.query(
    `
    SELECT dimria_id
    FROM listings
    WHERE dimria_id = ANY($1)
    `,
    [ids]
  );

  const existing = new Set(res.rows.map(r => r.dimria_id));

  return ids.filter(id => !existing.has(id));
}