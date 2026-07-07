"use client";

import { useState, useEffect } from "react";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb";
import Message from "./page/Message";
import Scan from "./page/scan"; // 👈 อิมพอร์ตระบบสไลด์โชว์คิวรุ่นใหม่เข้ามา
import { AnimatePresence } from "framer-motion"; // อิมพอร์ตตัวจัดการสลับแอนิเมชัน
import { post } from "@/app/Post";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  
  // ⚡ สถานะเช็กว่าขณะนี้มีสไลด์รูปคนแสดงอยู่หรือไม่
  const [hasActivePost, setHasActivePost] = useState<boolean>(false);

  useEffect(() => {
    // 1. สร้างฟังก์ชันสำหรับยิงไปดึงค่าจาก API
    const checkStatus = async () => {
      try {
        const res = await fetch(`${post}/apinext/control`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store", // ป้องกัน Browser จำแคชเก่า (สำคัญมากสำหรับการทำ Polling)
        });
        const data = await res.json();

        console.log("🔌 API Control Response:", data);

        if (data.success && data.data) {
          console.log("⚙️ System isOpen Type:", data.data.type);
          // 🛠️ บังคับให้เป็น true เสมอสำหรับการทดสอบโลคอล
          setIsOpen(true);
        } else {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("โหลดข้อมูลสถานะระบบล้มเหลว:", error);
        setIsOpen(true); // ปล่อยผ่านเป็น true เพื่อให้ QR Code แสดงผลแม้ API ล่ม
      } finally {
        setLoading(false);
      }
    };

    // 2. สั่งให้ทำงานทันที 1 ครั้งตอนเปิดหน้าเว็บ
    checkStatus();

    // 3. ตั้งเวลาให้ทำงานซ้ำทุก ๆ 5 วินาที (5000 มิลลิวินาที)
    const intervalId = setInterval(checkStatus, 5000);

    // 4. เคลียร์ Interval ทิ้งเมื่อย้ายหน้าหรือ Component ถูกทำลาย (ป้องกัน Memory Leak)
    return () => clearInterval(intervalId);
  }, []);

  // ตอนเข้าหน้าเว็บครั้งแรกสุด รอผลลัพธ์แป๊บหนึ่ง
  if (loading) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        กำลังตรวจสอบสถานะระบบ...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* BK (ฉากหลัง) แสดงผลตลอดเวลา */}
      <div className="absolute inset-0 z-0">
        <BK />
      </div>

      {/* 🛠️ กล่องข้อมูลและตัวเด้ง (จะแสดงเฉพาะตอนเปิดระบบ และไม่มีรูปภาพใดๆ แสดงอยู่ในจอ) */}
      {isOpen && (
        <>
          {!hasActivePost && (
            <div className="absolute inset-0 z-10">
              <Cdweb />
            </div>
          )}
          
          <div className="absolute inset-0 z-20 pointer-events-none">
            <Message />
          </div>
        </>
      )}

      {/* 📸 เปิดการทำงานระบบสไลด์โชว์คิว IG ขึ้นจอใหญ่อย่างเป็นทางการ */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <AnimatePresence mode="wait">
          <Scan onActivePostChange={setHasActivePost} />
        </AnimatePresence>
      </div>
    </div>
  );
}
