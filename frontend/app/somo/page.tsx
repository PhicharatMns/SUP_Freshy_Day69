"use client";

import { useState } from "react";
import HomePage from "../SPU/Home/page";
import { post } from "../Post";

export default function Somo() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleHome = async () => {
        const newValue = !isOpen;

        try {
            const res = await fetch(`${post}/apinext/control`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: newValue
                })
            });

            const data = await res.json();

            if (data.success && data.data) {
                setIsOpen(data.data.type);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-6">
            <button
                onClick={toggleHome}
                className="px-5 py-3 bg-purple-600 text-white rounded-xl active:scale-95 transition-all"
            >
                {isOpen ? "✕ ปิดหน้าหลัก" : "☰ เปิดหน้าหลัก"}
            </button>
        </div>
    );
}