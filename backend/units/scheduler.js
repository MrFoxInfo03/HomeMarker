const pool = require("./db.js");

export async function schedulerRun(taskName, hours, funcName) 
{
    const query_text = `
        INSERT INTO scheduler(task_name, last_run)
        VALUES (${taskName}, NOW())
        ON CONFLICT (${taskName})
        DO UPDATE SET 
            last_run = EXCLUDED.last_run
        WHERE scheduler.last_run <= NOW() - INTERVAL '${hours} hours'
        RETURNING (scheduler.last_run IS DISTINCT FROM EXCLUDED.last_run) AS success;
    `;

    try {
        const result = await pool.query(query_text);

        const isSuccess = result.rows[0]?.success;

        if(isSuccess === false) {
            return false;
        }

        funcName()

    } catch(error) {
        console.log(`units/scheduler.js\nError: ${error}`);
    }
}