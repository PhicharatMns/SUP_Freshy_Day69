import { Hono } from "hono";
import { pool } from "../DB/DB.js";
const popcar = new Hono();
// ดึงคะแนนทุกคณะ
popcar.get("/scores", async (c) => {
    try {
        const [rows] = await pool.query(`
      SELECT *
      FROM departments_score
      ORDER BY total_clicks DESC
    `);
        return c.json({
            status: true,
            data: rows,
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            status: false,
            message: "Server Error",
        }, 500);
    }
});
// ดึงคะแนนคณะเดียว
popcar.get("/score/:departmentKey", async (c) => {
    try {
        const departmentKey = c.req.param("departmentKey");
        const [rows] = await pool.query(`
      SELECT *
      FROM departments_score
      WHERE department_key = ?
      `, [departmentKey]);
        if (rows.length === 0) {
            return c.json({
                status: false,
                message: "Department not found",
            }, 404);
        }
        return c.json({
            status: true,
            data: rows[0],
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            status: false,
            message: "Server Error",
        }, 500);
    }
});
popcar.post("/click", async (c) => {
    try {
        const { departmentKey } = await c.req.json();
        if (!departmentKey) {
            return c.json({
                status: false,
                message: "departmentKey is required",
            }, 400);
        }
        await pool.query(`
      UPDATE departments_score
      SET
        total_clicks = total_clicks + 1,
        updated_at = NOW()
      WHERE department_key = ?
      `, [departmentKey]);
        const [rows] = await pool.query(`SELECT * FROM departments_score WHERE department_key = ?`, [departmentKey]);
        if (rows.length === 0) {
            return c.json({
                status: false,
                message: "Department not found",
            }, 404);
        }
        return c.json({
            status: true,
            data: rows[0],
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            status: false,
            message: "Server Error",
        }, 500);
    }
});
popcar.post("/click-bulk", async (c) => {
    try {
        const { departmentKey, count } = await c.req.json();
        if (!departmentKey || !count) {
            return c.json({
                status: false,
                message: "departmentKey and count required",
            }, 400);
        }
        await pool.query(`
      UPDATE departments_score
      SET
        total_clicks = total_clicks + ?,
        updated_at = NOW()
      WHERE department_key = ?
      `, [count, departmentKey]);
        const [rows] = await pool.query(`SELECT * FROM departments_score WHERE department_key = ?`, [departmentKey]);
        return c.json({
            status: true,
            data: rows[0],
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            status: false,
            message: "Server Error",
        }, 500);
    }
});
popcar.post("/register", async (c) => {
    try {
        const { studentId, studentName, } = await c.req.json();
        if (!studentId || !studentName) {
            return c.json({
                status: false,
                message: "studentId and studentName required",
            }, 400);
        }
        await pool.query(`
      INSERT INTO popcat_users (
        student_id,
        student_name
      )
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE
      student_name = VALUES(student_name)
      `, [studentId, studentName]);
        const [rows] = await pool.query(`SELECT * FROM popcat_users WHERE student_id = ?`, [studentId]);
        return c.json({
            status: true,
            data: rows[0],
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            status: false,
            message: "Server Error",
        }, 500);
    }
});
popcar.post("/click-bulk-user", async (c) => {
    try {
        const body = await c.req.json();
        const { departmentKey, count, studentId } = body;
        // validate
        if (!departmentKey || !count || !studentId) {
            return c.json({
                status: false,
                message: "departmentKey, count and studentId required",
            }, 400);
        }
        // 1. get user
        const [userRows] = await pool.query(`
      SELECT student_id, student_name
      FROM popcat_users
      WHERE student_id = ?
      `, [studentId]);
        if (userRows.length === 0) {
            return c.json({
                status: false,
                message: "User not found",
            }, 404);
        }
        const user = userRows[0];
        // 2. insert / update player
        await pool.query(`
      INSERT INTO popcat_players (
        student_id,
        student_name,
        department_key,
        total_clicks
      )
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        student_name = VALUES(student_name),
        total_clicks = total_clicks + VALUES(total_clicks),
        updated_at = NOW()
      `, [
            user.student_id,
            user.student_name,
            departmentKey,
            count,
        ]);
        const [playerRows] = await pool.query(`
      SELECT * FROM popcat_players
      WHERE student_id = ? AND department_key = ?
      `, [user.student_id, departmentKey]);
        return c.json({
            status: true,
            data: playerRows[0],
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            status: false,
            message: "Server Error",
        }, 500);
    }
});
popcar.get("/top-departments", async (c) => {
    try {
        // ใช้ ROW_NUMBER() OVER ในการหาตัวท็อปแทน DISTINCT ON ใน PostgreSQL
        const [rows] = await pool.query(`
      SELECT student_id, student_name, department_key, total_clicks, updated_at
      FROM (
        SELECT 
          student_id,
          student_name,
          department_key,
          total_clicks,
          updated_at,
          ROW_NUMBER() OVER (PARTITION BY department_key ORDER BY total_clicks DESC) as rn
        FROM popcat_players
      ) t
      WHERE rn = 1
      ORDER BY total_clicks DESC;
    `);
        return c.json({
            status: true,
            data: rows,
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            status: false,
            message: "Server Error",
        }, 500);
    }
});
export default popcar;
