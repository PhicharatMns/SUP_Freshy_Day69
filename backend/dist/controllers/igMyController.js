import { Context } from "hono";
import { prisma } from "../config/database.js";
import { uploadToR2 } from "../utils/r2.js";
import sharp from 'sharp';
export const insertIg = async (c) => {
    try {
        const formData = await c.req.formData();
        const imageFile = formData.get('image');
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
        let filePath = "";
        if (imageFile && imageFile.size > 0) {
            if (!imageFile.type.startsWith('image/')) {
                return c.json({ success: false, message: "กรุณาอัปโหลดไฟล์รูปภาพที่ถูกต้อง" }, 400);
            }
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.webp`;
            filePath = `IG_Images/${fileName}`;
            const arrayBuffer = await imageFile.arrayBuffer();
            const inputBuffer = Buffer.from(arrayBuffer);
            const webpBuffer = await sharp(inputBuffer)
                .webp({ quality: 60 })
                .toBuffer();
            try {
                uploadedImageUrl = await uploadToR2(filePath, webpBuffer, 'image/webp');
            }
            catch (storageError) {
                console.error("❌ R2 Storage Upload Error:", storageError);
                return c.json({ success: false, message: "ไม่สามารถอัปโหลดรูปภาพได้" }, 500);
            }
        }
        // 1. ดึงโดเมนรูปภาพสาธารณะจาก .env
        const publicUrlBase = process.env.R2_PUBLIC_URL || `https://${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET_NAME || "sup69"}`;
        const cleanBase = publicUrlBase.replace(/\/$/, "");
        const finalImageUrl = uploadedImageUrl ? `${cleanBase}/${filePath.replace(/^\//, "")}` : null;
        const quote = await prisma.ig_quotes.create({
            data: {
                name,
                quote_text: quoteText,
                image_url: finalImageUrl,
                ig_account: igAccount,
                type,
                popup: true // ⚡ กำหนดเป็น true เพื่อให้ดึงขึ้นสไลด์จอใหญ่อัตโนมัติทันที
            }
        });
        return c.json({
            success: true,
            message: "บันทึกข้อมูลตาราง IG และแปลงรูปภาพสำเร็จเรียบร้อย!",
            data: { id: quote.id, imageUrl: finalImageUrl }
        }, 201);
    }
    catch (error) {
        console.error("❌ Server Error (ig_my):", error);
        return c.json({ success: false, message: "เกิดข้อผิดพลาดภายในระบบหลังบ้าน" }, 500);
    }
};
export const selectIg = async (c) => {
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
};
export const nextPopup = async (c) => {
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
};
export const deleteIg = async (c) => {
    try {
        const id = Number(c.req.param('id'));
        if (!id) {
            return c.json({ success: false, message: "ระบุ ID ไม่ถูกต้อง" }, 400);
        }
        // ลบข้อมูลแถวนี้ออกจากฐานข้อมูล MySQL
        await prisma.ig_quotes.delete({
            where: {
                id: id
            }
        });
        return c.json({
            success: true,
            message: "ลบโพสต์ IG เรียบร้อยแล้ว!"
        }, 200);
    }
    catch (error) {
        console.error("❌ Delete IG Error:", error);
        return c.json({
            success: false,
            message: "เกิดข้อผิดพลาดในการลบข้อมูล",
            error: error.message
        }, 500);
    }
};
