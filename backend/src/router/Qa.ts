import { Hono } from "hono";
import { pool } from "../DB/DB.js";
import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';

const Qa = new Hono();

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

Qa.post('/Qafrom', async (c) => {
    try {
        // 💡 เปลี่ยนจาก c.req.parseBody() มาใช้ c.req.formData() แทน เพื่อป้องกันอาการค้าง
        const formData = await c.req.formData();

        const studentName = formData.get('studentName') as string;
        const feelingText = formData.get('feelingText') as string;
        const imageFile = formData.get('studentImage') as File | null;

        if (!studentName || !feelingText) {
            return c.json({ success: false, message: "กรุณากรอกข้อมูลให้ครบถ้วน" }, 400);
        }

        let uploadedImageUrl: string | null = null;

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

            // อัปโหลดเข้า Supabase Storage
            const { data: storageData, error: storageError } = await supabase.storage
                .from('student-images')
                .upload(filePath, webpBuffer, {
                    contentType: 'image/webp',
                    upsert: true
                });

            if (storageError) {
                console.error("❌ Storage Upload Error:", storageError);
                return c.json({ success: false, message: "ไม่สามารถอัปโหลดรูปภาพได้" }, 500);
            }

            const { data: urlData } = supabase.storage
                .from('student-images')
                .getPublicUrl(filePath);

            uploadedImageUrl = urlData.publicUrl;
        }

        // บันทึกเข้า PostgreSQL
        const queryText = `
            INSERT INTO quotes (student_name, feeling_text, image_url) 
            VALUES ($1, $2, $3) 
            RETURNING id;
        `;
        const values = [studentName, feelingText, uploadedImageUrl];
        const result = await pool.query(queryText, values);

        return c.json({
            success: true,
            message: "บันทึกข้อมูลและแปลงรูปภาพเป็น WebP สำเร็จเรียบร้อย!",
            data: { id: result.rows[0].id, imageUrl: uploadedImageUrl }
        }, 201);

    } catch (error) {
        console.error("❌ Server Error:", error);
        return c.json({ success: false, message: "เกิดข้อผิดพลาดภายในระบบหลังบ้าน" }, 500);
    }
});

Qa.get('/select-qa', async (c) => {
    try {
        const sql = `
        SELECT id ,student_name,feeling_text,image_url
        FROM quotes 
        ORDER BY id DESC
        LIMIT 25;
        `

        const result = await pool.query(sql)
        return c.json({
            success: true,
            message: "ดึงข้อมูลคำถามสำเร็จ",
            data: result.rows
        }, 200);

    } catch (error) {
        return c.json({
            success: false,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์"
        }, 500);
    }

})

export default Qa;