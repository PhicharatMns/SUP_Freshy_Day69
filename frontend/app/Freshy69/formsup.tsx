"use client";

import { useState, useEffect } from "react";
import Myself from "./component/page/myself";
import IG from "./component/page/IG";
import { div } from "framer-motion/client";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";

export interface propspopup {
    myself: boolean
    myopenpopypIG: boolean
}

// สร้าง type รองรับข้อมูลฟองสบู่
interface Bubble {
    color: string;
    size: number;
    duration: number;
    left: number;
    delay: number;
    opacity: number;
}

export default function Formsup() {
    const [popup, setpoup] = useState({
        myself: false,
        myopenpopypIG: false
    })

    // สร้าง state ไว้เก็บข้อมูลฟองสบู่ (เริ่มต้นเป็นอาร์เรย์ว่างเพื่อไม่ให้ฝั่ง Server แอบเรนเดอร์ล่วงหน้า)
    const [bubbles, setBubbles] = useState<Bubble[]>([]);

    const openpopupMyselt = () => setpoup(prev => ({
        ...prev,
        myself: true
    }))

    const openpopypIG = () => setpoup(prev => ({
        ...prev,
        myopenpopypIG: true
    }))

    const Social = [
        {
            title: 'แนะนำตัว',
            popup: openpopupMyselt,
            gradient: 'from-amber-400 via-pink-500 to-purple-600',
        },
        {
            title: 'IG ไอใจ',
            popup: openpopypIG,
            gradient: 'from-purple-600 via-rose-500 to-amber-500',
        }
    ]

    const bubbleColors = [
        'bg-white', 'bg-sky-300', 'bg-purple-300', 'bg-pink-300',
        'bg-emerald-300', 'bg-violet-300', 'bg-rose-300', 'bg-cyan-300'
    ];

    // คำนวณค่าสุ่มเฉพาะบน Client เท่านั้นหลังจาก Hydration เสร็จสิ้น
    useEffect(() => {
        const generatedBubbles = Array.from({ length: 30 }).map(() => ({
            color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
            size: 13 + Math.random() * 27,
            duration: 4 + Math.random() * 9,
            left: Math.random() * 100,
            delay: Math.random() * 15,
            opacity: 0.85 + Math.random() * 0.15,
        }));
        setBubbles(generatedBubbles);
    }, []);

    return (
        <div>
            <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-screen z-50 ">

                {/* ฟองสบู่ลอย */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {bubbles.map((bubble, i) => {
                        return (
                            <div
                                key={i}
                                className={`absolute bottom-[-60px] rounded-full ${bubble.color} 
                                       shadow-[0_0_18px_#fff,0_0_32px_rgba(255,255,255,0.5),inset_8px_8px_12px_rgba(255,255,255,0.9)] 
                                       ring-1 ring-white/50
                                       animate-[floatBubble_linear_infinite]`}
                                style={{
                                    left: `${bubble.left}%`,
                                    width: `${bubble.size}px`,
                                    height: `${bubble.size}px`,
                                    animationDuration: `${bubble.duration}s`,
                                    animationDelay: `-${bubble.delay}s`,
                                    opacity: bubble.opacity,
                                }}
                            />
                        );
                    })}
                </div>

                <div className="mb-5 text-3xl font-bold">
                    <span className="text-red-500"> เลือก</span>
                    <span className="text-yellow-500">ที่ชอบ </span>
                    <span className="text-blue-500">เอาที่</span>
                    <span className="text-red-500">ใช่</span>
                </div>

                <style jsx global>{`
                @keyframes gentleBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); } 
                }
                .animate-gentle-bounce {
                    animation: gentleBounce 2s infinite ease-in-out;
                }
                `}</style>

                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl p-4">
                    {Social.map((e, i) => {
                        return (
                            <div
                                onClick={e.popup}
                                className={`w-full text-2xl h-40 flex items-center justify-center rounded-[20px] font-bold text-white shadow-lg bg-gradient-to-tr ${e.gradient} animate-gentle-bounce transition-all duration-300 cursor-pointer   `}
                                key={i}
                            >
                                {e.title}
                            </div>
                        )
                    })}
                </div>
            </div>

            <AnimatePresence>
                {popup.myself && (
                    <div className="z-90 relative">
                        <Myself
                            setpoup={setpoup}
                        />
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {popup.myopenpopypIG && (
                    <div className="z-90 relative">
                        <IG
                            setpoup={setpoup}
                        />
                    </div>
                )}
            </AnimatePresence>

        </div>
    )
}