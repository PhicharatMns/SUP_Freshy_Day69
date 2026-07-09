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
  const [showPopcar, setShowPopcar] = useState<boolean>(false);

  // ⚡ สถานะเช็กว่าขณะนี้มีสไลด์รูปคนแสดงอยู่หรือไม่
  const [hasActivePost, setHasActivePost] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${post}/apinext/control`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success && data.data && data.data.popcar !== undefined) {
          setShowPopcar(data.data.popcar);
        }
      } catch (error) {
        console.error("โหลดข้อมูลสถานะระบบล้มเหลว:", error);
      }
    };

    checkStatus();
    const intervalId = setInterval(checkStatus, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 1. BK ฉากหลังสุด (z-0) */}
      <div className="absolute inset-0 z-0">
        <BK />
      </div>

      {/* Cdweb (QR Code หมุนๆ) แสดงเมื่อไม่มีรูปสไลด์เปิดอยู่ (z-10) */}
      {!hasActivePost && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="pointer-events-auto w-full h-full">
            <Cdweb />
          </div>
        </div>
      )}

      {/* Message กระดาน Q&A (z-20) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Message />
      </div>

      {/* 📸 ระบบสไลด์โชว์คิว IG ขึ้นจอใหญ่ (z-40) */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <AnimatePresence mode="wait">
          <Scan onActivePostChange={setHasActivePost} />
        </AnimatePresence>
      </div>

      {/* 3. Popcar รถป๊อป (z-30) (จะแสดงก็ต่อเมื่อกด "เรียกใช้ Popcar" ที่รีโมท) */}
      {showPopcar && (
        <div className="absolute inset-0  pointer-events-none z-[9999]">
          <Popcar />
        </div>
      )}
    </div>
  );
}
