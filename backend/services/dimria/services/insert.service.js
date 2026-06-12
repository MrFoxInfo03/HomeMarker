import { pool } from '../../../units/db.js';

export function insertToDatabase(items)
{
    await pool.connect();

    const columns = Object.keys(items);
    const values = Object.values(items);
    const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INFO dimria_realty (${columns.map(col => `"${col}"`).join(', ')})
    VALUES (${placeholders})
    RETURNING *
    `;

    try {
        const res = await pool.query(query, values);
        return res.rows[0];
    } catch(err) {
        console.log("Error insert:", err.message);
        throw err;
    }
}