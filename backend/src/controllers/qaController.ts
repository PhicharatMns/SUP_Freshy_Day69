import { Context } from "hono";
import { prisma } from "../config/database.js";
import { uploadToR2 } from "../utils/r2.js";
import sharp from 'sharp';

export const submitQa = async (c: Context) => {
    try {
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

            const arrayBuffer = await imageFile.arrayBuffer();
            const inputBuffer = Buffer.from(arrayBuffer);

            const webpBuffer = await sharp(inputBuffer)
                .webp({ quality: 60 })
                .toBuffer();

            // อัปโหลดเข้า Cloudflare R2 Storage
            try {
                uploadedImageUrl = await uploadToR2(filePath, webpBuffer, 'image/webp');
            } catch (storageError) {
                console.error("❌ R2 Storage Upload Error:", storageError);
                return c.json({ success: false, message: "ไม่สามารถอัปโหลดรูปภาพได้" }, 500);
            }
        }

        // บันทึกเข้า MySQL ผ่าน Prisma
        const quote = await prisma.quotes.create({
            data: {
                student_name: studentName,
                feeling_text: feelingText,
                image_url: uploadedImageUrl
            }
        });

        return c.json({
            success: true,
            message: "บันทึกข้อมูลและแปลงรูปภาพเป็น WebP สำเร็จเรียบร้อย!",
            data: { id: quote.id, imageUrl: uploadedImageUrl }
        }, 201);

    } catch (error) {
        console.error("❌ Server Error:", error);
        return c.json({ success: false, message: "เกิดข้อผิดพลาดภายในระบบหลังบ้าน" }, 500);
    }
};

export const getQa = async (c: Context) => {
    try {
        const rows = await prisma.quotes.findMany({
            orderBy: {
                id: 'desc'
            },
            take: 25
        });

        return c.json({
            success: true,
            message: "ดึงข้อมูลคำถามสำเร็จ",
            data: rows
        }, 200);

    } catch (error) {
        return c.json({
            success: false,
            message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์"
        }, 500);
    }
};
