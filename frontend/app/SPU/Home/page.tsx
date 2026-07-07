"use client";

import { useState, useEffect } from "react";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb";
import Message from "./page/Message";
import { post } from "@/app/Post";
import Popcar from "./page/Popcar";

// 🛠️ 1. อย่าลืม Import Scan และ AnimatePresence กลับมาด้วยนะครับ
import Scan from "./page/scan"; 
import { AnimatePresence } from "framer-motion"; 

export default function HomePage() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    
    // State สำหรับควบคุมการแสดงผลของ Popcar
    const [showPopcar, setShowPopcar] = useState<boolean>(false);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const res = await fetch(`${post}/apinext/control`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
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
        return <div className="w-full h-screen bg-black text-white flex items-center justify-center">กำลังตรวจสอบสถานะระบบ...</div>;
    }

    return (
        <div className="relative w-full h-screen overflow-hidden">

            {/* BK (ฉากหลัง) แสดงผลตลอดเวลา */}
            <div className="absolute inset-0 z-0">
                <BK />
            </div>
            
            {/* ควบคุมหน้าหลัก */}
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

            {/* ควบคุม Popcar */}
            {showPopcar && (
                <div className="absolute inset-0 z-30 pointer-events-none">
                    <Popcar />
                </div>
            )}

            {/* 🛠️ 2. นำ QR Code (Scan) กลับมาแล้วครับ! */}
            <div className="absolute inset-0 z-40 pointer-events-none">
                <AnimatePresence>
                    <Scan />
                </AnimatePresence>
            </div>
            
        </div>
    );
}