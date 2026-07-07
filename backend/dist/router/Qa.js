import { Hono } from "hono";
import { pool } from "../DB/DB.js";
import { uploadToR2 } from "../utils/r2.js";
import sharp from 'sharp';
const Qa = new Hono();
Qa.post('/Qafrom', async (c) => {
    try {
        // 💡 เปลี่ยนจาก c.req.parseBody() มาใช้ c.req.formData() แทน เพื่อป้องกันอาการค้าง
        const formData = await c.req.formData();
        const studentName = formData.get('studentName');
        const feelingText = formData.get('feelingText');
        const imageFile = formData.get('studentImage');
        if (!studentName || !feelingText) {
            return c.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" }, 400);
        }
        let uploadedImageUrl = null;
        // ตรวจสอบโครงสร้างไฟล์ภาพ
        if (imageFile && imageFile.size > 0) {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
            const filePath = `Image69/${fileName}`;
            // ดึง ArrayBuffer ออกมาแปลงเป็น Buffer ส่งให้ sharp ทำงาน
            const arrayBuffer = await imageFile.arrayBuffer();
            const inputBuffer = Buffer.from(arrayBuffer);
            const webpBuffer = await sharp(inputBuffer)
                .webp({ quality: 60 })
                .toBuffer();
            // อัปโหลดเข้า Cloudflare R2 Storage
            try {
                uploadedImageUrl = await uploadToR2(filePath, webpBuffer, 'image/webp');
            }
            catch (storageError) {
                console.error("❌ R2 Storage Upload Error:", storageError);
                return c.json({ success: false, message: "ไม่สามารถอัปโหลดรูปภาพได้" }, 500);
            }
        }
        // บันทึกเข้า MySQL
        const queryText = `
            INSERT INTO quotes (student_name, feeling_text, image_url) 
            VALUES (?, ?, ?);
        `;
        const values = [studentName, feelingText, uploadedImageUrl];
        const [insertResult] = await pool.query(queryText, values);
        return c.json({
            success: true,
            message: "บันทึกข้อมูลและแปลงรูปภาพเป็น WebP สำเร็จเรียบร้อย!",
            data: { id: insertResult.insertId, imageUrl: uploadedImageUrl }
        }, 201);
    }
    catch (error) {
        console.error("❌ Server Error:", error);
        return c.json({ success: false, message: "เกิดข้อผิดพลาดภายในระบบหลังบ้าน" }, 500);
    }
});
Qa.get('/select-qa', async (c) => {
    try {
        const sql = `
        SELECT id, student_name, feeling_text, image_url, created_at
        FROM quotes 
        ORDER BY id DESC
        LIMIT 25;
        `;
        const [rows] = await pool.query(sql);
        return c.json({
            success: true,
            message: "ดึงข้อมูลคำถามสำเร็จ",
            data: rows
        }, 200);
    }
    catch (error) {
        return c.json({
            success: false,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์"
        }, 500);
    }
});
export default Qa;
