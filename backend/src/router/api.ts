import { Hono } from "hono";
import { pool } from "../DB/DB.js";

const apinext = new Hono();

apinext.put("/control", async (c) => {
    try {
        const { type } = await c.req.json();

        const result = await pool.query(
            `
            UPDATE control
            SET type = $1
            WHERE id = 1
            RETURNING *
            `,
            [type]
        );

        // ตรวจสอบว่ามีการ Update สำเร็จจริงไหม
        if (result.rows.length === 0) {
            return c.json({ success: false, message: "ไม่พบข้อมูล ID: 1" }, 404);
        }

        return c.json({
            success: true,
            data: result.rows[0] // ส่งก้อนนี้กลับไป ซึ่งมี { id: 1, type: ... } อยู่ข้างใน
        });

    } catch (error) {
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
});

apinext.get("/control", async (c) => {
    try {
        const result = await pool.query(
            `
            SELECT * FROM control 
            WHERE id = 1
            `
        );

        // ถ้าไม่มีข้อมูล ID = 1 ในตารางเลย
        if (result.rows.length === 0) {
            return c.json({ success: false, message: "ไม่พบข้อมูล ID: 1" }, 404);
        }

        return c.json({
            success: true,
            data: result.rows[0] // ส่งค่า { id: 1, type: true/false } กลับไป
        });

    } catch (error) {
        console.error("SELECT Error:", error);
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
});

export default apinext;