import pool from '../../../units/db.js';
import normalized from './normalized.dimria.js';

export async function insertToDB_DimriaRealty(items) {
    try {
        let query = "INSERT INTO dimria_realty (";
        const params = normalized(items);

        for (let i = 0; i <= Object.keys(params).length; i++) {
            query += Object.keys(params)[i] + ', ';
        }

        query += ") VALUES (";

        for (let i = 0; i <= Object.keys(params).length; i++) {
            query += Object.values(params)[i] + ', ';
        }

        query += ") ON CONFLICT(realty_id) RETURNING *;";

        const result = await pool.query(query);

        if(result.rows[0].length === 0) {
            console.log(`dimria_realty_insert.\nThe write failed because the output order was empty.`);
            return;
        }

        console.log("Success insert data.");

    } catch(err) {
        console.error(`dimria_realty_insert\nError: ${err}`);
    }
}