import { Hono } from "hono";
import { prisma } from "../DB/DB.js";
import { uploadToR2 } from "../utils/r2.js";
import sharp from 'sharp';
const ig_my = new Hono();
// 1. Route สำหรับบันทึกข้อมูลตารางใหม่ (POST)
ig_my.post('/insert-ig', async (c) => {
    try {
        const formData = await c.req.formData();
        const imageFile = formData.get('image');
        // Validation เบื้องต้น (เช็กว่ากรอกข้อมูลจำเป็นครบไหม)
        const name = String(formData.get("name") || "");
        const quoteText = String(formData.get("quoteText") || "");
        const igAccount = String(formData.get("igAccount") || "");
        const type = String(formData.get("type") || "");
        if (!quoteText) {
            return c.json({
                success: false,
                message: "กรุณากรอก IG และความในใจ"
            }, 400);
        }
        let uploadedImageUrl = null;
        // ตรวจสอบและจัดการไฟล์รูปภาพ
        if (imageFile && imageFile.size > 0) {
            // เช็กประเภทไฟล์เพื่อความปลอดภัย
            if (!imageFile.type.startsWith('image/')) {
                return c.json({ success: false, message: "กรุณาอัปโหลดไฟล์รูปภาพที่ถูกต้อง" }, 400);
            }
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
            const filePath = `IG_Images/${fileName}`; // แยก Folder ใน Bucket ให้ชัดเจน
            // แปลงไฟล์เป็น WebP คุณภาพ 60% ด้วย sharp
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
        // บันทึกเข้า MySQL ผ่าน Prisma
        const quote = await prisma.ig_quotes.create({
            data: {
                name,
                quote_text: quoteText,
                image_url: uploadedImageUrl,
                ig_account: igAccount,
                type
            }
        });
        return c.json({
            success: true,
            message: "บันทึกข้อมูลตาราง IG และแปลงรูปภาพสำเร็จเรียบร้อย!",
            data: { id: quote.id, imageUrl: uploadedImageUrl }
        }, 201);
    }
    catch (error) {
        console.error("❌ Server Error (ig_my):", error);
        return c.json({ success: false, message: "เกิดข้อผิดพลาดภายในระบบหลังบ้าน" }, 500);
    }
});
ig_my.get('/select-ig', async (c) => {
    try {
        const rows = await prisma.ig_quotes.findMany({
            orderBy: {
                id: 'desc'
            },
            take: 20
        });
        return c.json({
            success: true,
            message: "ดึงข้อมูลจากตาราง IG สำเร็จ",
            data: rows
        }, 200);
    }
    catch (error) {
        console.error("❌ DB Error (ig_my):", error);
        return c.json({
            success: false,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์"
        }, 500);
    }
});
ig_my.get('/next-popup', async (c) => {
    try {
        const item = await prisma.ig_quotes.findFirst({
            where: {
                popup: true
            },
            orderBy: {
                id: 'asc'
            }
        });
        if (!item) {
            return c.json({
                success: true,
                data: null
            });
        }
        await prisma.ig_quotes.update({
            where: {
                id: item.id
            },
            data: {
                popup: false
            }
        });
        return c.json({
            success: true,
            data: item
        });
    }
    catch (error) {
        console.error(error);
        return c.json({
            success: false,
            message: 'Server Error'
        }, 500);
    }
});
export default ig_my;
