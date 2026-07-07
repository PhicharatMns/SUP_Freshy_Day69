"use client";

import { useState, useEffect } from "react";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb";
import Message from "./page/Message";
import { post } from "@/app/Post";

export default function HomePage() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // 1. สร้างฟังก์ชันสำหรับยิงไปดึงค่าจาก API
        const checkStatus = async () => {
            try {
                const res = await fetch(`${post}/apinext/control`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    cache: "no-store" // ป้องกัน Browser จำแคชเก่า (สำคัญมากสำหรับการทำ Polling)
                });
                const data = await res.json();

                if (data.success && data.data) {
                    setIsOpen(data.data.type);
                }
            } catch (error) {
                console.error("โหลดข้อมูลสถานะระบบล้มเหลว:", error);
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
        return <div className="w-full h-screen bg-black text-white flex items-center justify-center">กำลังตรวจสอบสถานะระบบ...</div>;
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">

            {/* BK (ฉากหลัง) แสดงผลตลอดเวลา */}
            <div className="absolute inset-0 z-0">
                <BK />
            </div>
            
            {/* 🛠️ ข้อมูลจะอัปเดตอัตโนมัติทุก 5 วิ ถ้าหลังบ้านเปลี่ยนเป็น false สองตัวนี้จะหายวับทันที */}
            {isOpen && (
                <>
                    <div className="absolute inset-0 z-0">
                        <Cdweb />
                    </div>

                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <Message />
                    </div>
                </>
            )}

            {/* ส่วนโค้ดที่คอมเมนต์ไว้คงเดิม */}
            {/* <div className="absolute inset-0 z-40 pointer-events-none">
                <AnimatePresence>
                    <Scan />
                </AnimatePresence>
            </div> */}

            {/* <div className="absolute inset-0 z-30 pointer-events-none">
                <Popcar />
            </div> */}
        </div>
    );
}