"use client";

import { useState, useEffect } from "react";
import { post } from "../Post";

export default function Somo() {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopcar, setShowPopcar] = useState(false);

    // ดึงสถานะปัจจุบันจากฐานข้อมูลเมื่อเปิดหน้ารีโมท
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await fetch(`${post}/apinext/control`, { cache: "no-store" });
                const data = await res.json();
                
                if (data.success && data.data) {
                    setIsOpen(data.data.type);
                    if (data.data.popcar !== undefined) {
                        setShowPopcar(data.data.popcar);
                    }
                }
            } catch (error) {
                console.error("โหลดข้อมูลสถานะเริ่มต้นล้มเหลว:", error);
            }
        };
        fetchStatus();
    }, []);

    const toggleHome = async () => {
        const newValue = !isOpen;
        try {
            const res = await fetch(`${post}/apinext/control`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: newValue })
            });
            const data = await res.json();
            if (data.success && data.data) {
                setIsOpen(data.data.type);
            } else {
                alert("หน้าหลัก: อัปเดตไม่สำเร็จ โปรดเช็คหลังบ้าน");
            }
        } catch (error) {
            console.error("Error Home:", error);
        }
    };

    const togglePopcar = async () => {
        const newValue = !showPopcar;
        try {
            const res = await fetch(`${post}/apinext/control`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ popcar: newValue })
            });
            const data = await res.json();
            if (data.success && data.data) {
                if (data.data.popcar !== undefined) {
                    setShowPopcar(data.data.popcar);
                }
            } else {
                alert("Popcar: อัปเดตไม่สำเร็จ โปรดเช็คว่าเพิ่มคอลัมน์ popcar ใน Database หรือยัง");
            }
        } catch (error) {
            console.error("Error Popcar:", error);
        }
    };

    return (
        <div className="p-6 flex flex-col gap-4 max-w-sm">
            <button
                onClick={toggleHome}
                className="px-5 py-4 bg-purple-600 text-white rounded-xl font-bold active:scale-95 transition-all shadow-md"
            >
                {isOpen ? "✕ ปิดหน้าหลัก" : "☰ เปิดหน้าหลัก"}
            </button>

            <button
                onClick={togglePopcar}
                className={`px-5 py-4 text-white rounded-xl font-bold active:scale-95 transition-all shadow-md ${
                    showPopcar ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
                {showPopcar ? "✕ ซ่อน Popcar" : "🚗 เรียกใช้ Popcar"}
            </button>
        </div>
    );
}