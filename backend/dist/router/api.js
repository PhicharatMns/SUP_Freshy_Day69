import { Hono } from "hono";
import { prisma } from "../DB/DB.js";
const apinext = new Hono();
apinext.put("/control", async (c) => {
    try {
        const { type } = await c.req.json();
        const updated = await prisma.control.update({
            where: { id: 1 },
            data: { type }
        });
        return c.json({
            success: true,
            data: updated
        });
    }
    catch (error) {
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
});
apinext.get("/control", async (c) => {
    try {
        const row = await prisma.control.findUnique({
            where: { id: 1 }
        });
        if (!row) {
            return c.json({ success: false, message: "ไม่พบข้อมูล ID: 1" }, 404);
        }
        return c.json({
            success: true,
            data: row
        });
    }
    catch (error) {
        console.error("SELECT Error:", error);
        return c.json({ success: false, message: "Internal Server Error" }, 500);
    }
});
export default apinext;
