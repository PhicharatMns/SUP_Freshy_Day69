"use client";

import BK from "../page/Bk";
import Cdweb from "../page/Cdweb";

export default function PortraitQRPage() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      
      {/* BK (ฉากหลังลายสติกเกอร์กราฟฟิตี้) */}
      <div className="absolute inset-0 z-0 opacity-80">
        <BK />
      </div>

      {/* 🔮 แสดงผล QR Code ดีวีดีลอยเด้งขอบจอด้วยความเร็วช้าเป็นพิเศษ (slow) และเอฟเฟกต์บับเบิ้ล */}
      <div className="absolute inset-0 z-10">
        <Cdweb speed="slow" />
      </div>

    </div>
  );
}
