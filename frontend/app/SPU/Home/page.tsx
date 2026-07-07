"use client";

import { useState, useEffect } from "react";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb";
import Popcar from "./page/Popcar";
import { post } from "@/app/Post";

export default function PortraitQRPage() {
  const [showPopcar, setShowPopcar] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // ระบบดึงสถานะจาก API (เหมือนใน HomePage)
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(`${post}/apinext/control`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const data = await res.json();

        if (data.success && data.data) {
          // ดึงเฉพาะสถานะ popcar มาใช้
          if (data.data.popcar !== undefined) {
            setShowPopcar(data.data.popcar);
          }
        }
      } catch (error) {
        console.error("โหลดข้อมูลระบบล้มเหลว:", error);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const intervalId = setInterval(checkStatus, 5000); // เช็คทุก 5 วิ
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div className="w-full h-screen bg-slate-950 flex items-center justify-center text-white">กำลังโหลดระบบ...</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      
      {/* 1. BK ฉากหลัง - z-0 */}
      <div className="absolute inset-0 z-0 opacity-80">
        <BK />
      </div>

      {/* 2. Cdweb (QR Code) - z-10 */}
      <div className="absolute inset-0 z-10">
        <Cdweb speed="slow" />
      </div>

      {/* 3. Popcar (จะโชว์ก็ต่อเมื่อ Database สั่งให้โชว์) - z-30 */}
      {showPopcar && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <Popcar />
        </div>
      )}

    </div>
  );
}
