import { Context } from "hono";
import { prisma } from "../config/database.js";

export const getControl = async (c: Context) => {
    try {
        const row = await prisma.control.findUnique({
            where: { id: 1 },
        });

        if (!row) {
            // ถ้าตารางว่างเปล่า ให้ส่งค่าเริ่มต้นกลับไปก่อน (ป้องกันหน้าบ้านพัง)
            return c.json({ 
                success: true, 
                data: { id: 1, type: false, popcar: false } 
            });
        }

        return c.json({
            success: true,
            data: row,
        });
    } catch (error) {
        console.error("SELECT Error:", error);
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
};

export const updateControl = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { type, popcar } = body;

        // 🛠️ เปลี่ยนจาก .update() เป็น .upsert()
        const updated = await prisma.control.upsert({
            where: { id: 1 },
            update: { 
                type: type, 
                popcar: popcar 
            },
            create: {
                id: 1, // บังคับสร้างแถวที่ id = 1
                type: type ?? false,     // ถ้าไม่มีค่าส่งมา ให้ค่าเริ่มต้นเป็น false
                popcar: popcar ?? false  // ถ้าไม่มีค่าส่งมา ให้ค่าเริ่มต้นเป็น false
            },
        });

        return c.json({
            success: true,
            data: updated,
        });
    } catch (error) {
        console.error("UPDATE Error:", error);
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
};