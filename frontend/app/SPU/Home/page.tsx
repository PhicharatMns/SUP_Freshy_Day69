"use client";

import { useState, useEffect } from "react";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb"; // 👈 SCAN HERE และ QR Code อยู่ในนี้ทั้งหมด!
import Message from "./page/Message";
import Scan from "./page/scan"; // 👈 อิมพอร์ตระบบสไลด์โชว์คิวรุ่นใหม่เข้ามา
import { AnimatePresence } from "framer-motion"; // อิมพอร์ตตัวจัดการสลับแอนิเมชัน
import { post } from "@/app/Post";
import Popcar from "./page/Popcar";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [showPopcar, setShowPopcar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // ⚡ สถานะเช็กว่าขณะนี้มีสไลด์รูปคนแสดงอยู่หรือไม่
  const [hasActivePost, setHasActivePost] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${post}/apinext/control`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store" 
        });
        const data = await res.json();

        if (data.success && data.data) {
          setIsOpen(data.data.type);
          if (data.data.popcar !== undefined) {
            setShowPopcar(data.data.popcar);
          }
        }
      } catch (error) {
        console.error("โหลดข้อมูลสถานะระบบล้มเหลว:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const intervalId = setInterval(checkStatus, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        กำลังตรวจสอบสถานะระบบ...
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* 1. BK ฉากหลังสุด (z-0) */}
      <div className="absolute inset-0 z-0">
        <BK />
      </div>
      
      {/* 2. กลุ่มหน้าหลัก (Message, QR Code, Scan Here) */}
      {isOpen && (
        <>
          {/* Cdweb (QR Code หมุนๆ) ต้องอยู่เลเยอร์ที่สูงกว่าพื้นหลัง (z-10) และแสดงเมื่อไม่มีรูปสไลด์เปิดอยู่ */}
          {!hasActivePost && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="pointer-events-auto w-full h-full">
                <Cdweb />
              </div>
            </div>
          )}

          {/* Message (กล่องข้อความนักศึกษา) ให้อยู่สูงสุดในกลุ่มนี้ (z-20) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <Message />
          </div>
        </>
      )}

      {/* 📸 เปิดการทำงานระบบสไลด์โชว์คิว IG ขึ้นจอใหญ่อย่างเป็นทางการ (z-40) */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <AnimatePresence mode="wait">
          <Scan onActivePostChange={setHasActivePost} />
        </AnimatePresence>
      </div>

      {/* 3. Popcar รถป๊อป (z-30) (จะแสดงก็ต่อเมื่อกด "เรียกใช้ Popcar" ที่รีโมท) */}
      {showPopcar && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <Popcar />
        </div>
      )}

    </div>
  );
}
