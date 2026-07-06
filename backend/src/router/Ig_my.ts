import { Hono } from "hono";
import { pool } from "../DB/DB.js";
import { createClient } from '@supabase/supabase-js';

const ig_my = new Hono();

// เรียกใช้ Supabase Client
const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_ANON_KEY || ''
);

// 1. Route สำหรับบันทึกข้อมูลตารางใหม่ (POST)
ig_my.post('/insert-ig', async (c) => {
    try {
        const formData = await c.req.formData();
        const imageFile = formData.get('image') as File | null;

        // Validation เบื้องต้น
        const name = String(formData.get("name") || "");
        const quoteText = String(formData.get("quoteText") || "");
        const igAccount = String(formData.get("igAccount") || "");

        if (!quoteText) {
            return c.json(
                {
                    success: false,
                    message: "กรุณากรอก IG และความในใจ"
                },
                400
            );
        }

        let uploadedImageUrl: string | null = null;

        // ตรวจสอบและจัดการไฟล์รูปภาพ
        if (imageFile && imageFile.size > 0) {
            // เช็กประเภทไฟล์เพื่อความปลอดภัย
            if (!imageFile.type.startsWith('image/')) {
                return c.json({ success: false, message: "กรุณาอัปโหลดไฟล์รูปภาพที่ถูกต้อง" }, 400);
            }

            // 💡 หน้าบ้านส่งแบบ jpeg ย่อขนาดมาแล้ว เปลี่ยนนามสกุลเป็น .jpg
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
            const filePath = `IG_Images/${fileName}`; 

            // 💡 ดึงข้อมูลภาพแปลงเป็น Buffer ตรงๆ โดยไม่ต้องพึ่ง sharp หลังบ้านอีกต่อไป
            const arrayBuffer = await imageFile.arrayBuffer();
            const fileBuffer = Buffer.from(arrayBuffer);

            // อัปโหลดเข้า Supabase Storage
            const { data: storageData, error: storageError } = await supabase.storage
                .from('student-images')
                .upload(filePath, fileBuffer, {
                    contentType: imageFile.type || 'image/jpeg',
                    upsert: true
                });

            if (storageError) {
                console.error("❌ Storage Upload Error:", storageError);
                return c.json({ success: false, message: "ไม่สามารถอัปโหลดรูปภาพได้" }, 500);
            }

            // ดึง Public URL ของรูปภาพออกมา
            const { data: urlData } = supabase.storage
                .from('student-images')
                .getPublicUrl(filePath);

            uploadedImageUrl = urlData.publicUrl;
        }

        // บันทึกเข้า PostgreSQL
        const queryText = `
            INSERT INTO ig_quotes (name, quote_text, image_url, ig_account) 
            VALUES ($1, $2, $3, $4) 
            RETURNING id;
        `;
        const values = [name, quoteText, uploadedImageUrl, igAccount];
        const result = await pool.query(queryText, values);

        return c.json({
            success: true,
            message: "บันทึกข้อมูลตาราง IG สำเร็จเรียบร้อย!",
            data: { id: result.rows[0].id, imageUrl: uploadedImageUrl }
        }, 201);

    } catch (error) {
        console.error("❌ Server Error (ig_my):", error);
        return c.json({ success: false, message: "เกิดข้อผิดพลาดภายในระบบหลังบ้าน" }, 500);
    }
});

ig_my.get('/select-ig', async (c) => {
    try {
        const sql = `
            SELECT id, name, quote_text, image_url, ig_account , popup
            FROM ig_quotes 
            ORDER BY id DESC
            LIMIT 50;
        `;

        const result = await pool.query(sql);
        return c.json({
            success: true,
            message: "ดึงข้อมูลจากตาราง IG สำเร็จ",
            data: result.rows
        }, 200);

    } catch (error) {
        console.error("❌ DB Error (ig_my):", error);
        return c.json({
            success: false,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์"
        }, 500);
    }
});

ig_my.get('/next-popup', async (c) => {
    try {
        const popup = await pool.query(`
            SELECT *
            FROM ig_quotes
            WHERE popup = true
            ORDER BY id ASC
            LIMIT 1
        `);

        if (popup.rows.length === 0) {
            return c.json({
                success: true,
                data: null
            });
        }

        const item = popup.rows[0];

        await pool.query(`
            UPDATE ig_quotes
            SET popup = false
            WHERE id = $1
        `, [item.id]);

        return c.json({
            success: true,
            data: item
        });

    } catch (error) {
        console.error(error);
        return c.json({
            success: false,
            message: 'Server Error'
        }, 500);
    }
});

export default ig_my;