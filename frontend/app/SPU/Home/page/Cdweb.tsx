"use client";

import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import Image from "next/image";


export default function Cdweb() {
    const [src, setSrc] = useState('');

    useEffect(() => {
        const generateQR = async () => {
            try {
                const url = await QRCode.toDataURL('https://www.instagram.com/bp_mnnn/');
                setSrc(url);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการสร้าง QR Code:", err);
            }
        };

        generateQR();
    }, []);

    const bubbleColors = [
        'bg-white', 'bg-sky-300', 'bg-purple-300', 'bg-pink-300',
        'bg-emerald-300', 'bg-violet-300', 'bg-rose-300', 'bg-cyan-300'
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden">

            {/* ฟองสบู่ลอย */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => {
                    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
                    const size = 13 + Math.random() * 27;
                    const duration = 4 + Math.random() * 9;

                    return (
                        <div
                            key={i}
                            className={`absolute bottom-[-60px] rounded-full ${color} 
                                       shadow-[0_0_18px_#fff,0_0_32px_rgba(255,255,255,0.5),inset_8px_8px_12px_rgba(255,255,255,0.9)] 
                                       ring-1 ring-white/50
                                       animate-[floatBubble_linear_infinite]`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                animationDuration: `${duration}s`,
                                animationDelay: `-${Math.random() * 15}s`,
                                opacity: 0.85 + Math.random() * 0.15,
                            }}
                        />
                    );
                })}
            </div>

            {/* เนื้อหาหลัก */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 gap-6">

                {/* SVG Text โค้ง */}
                <div className="flex items-center justify-center -mb-6 -mt-25">
                    <svg width="620" height="190" viewBox="0 0 620 190" className="drop-shadow-2xl">
                        <defs>
                            <path
                                id="curve"
                                d="M 40 160 Q 310 35 580 160"
                            />
                        </defs>

                        <text
                            className="font-luckiest-guy"
                            fontSize="68"
                            fontWeight="900"
                            letterSpacing="6"
                            textAnchor="middle"
                        >
                            <textPath href="#curve" startOffset="50%">
                                <tspan fill="#ef4444">SC</tspan>
                                <tspan fill="#fbbf24">AN</tspan>
                                <tspan> </tspan>
                                <tspan fill="#3b82f6">HERE</tspan>
                            </textPath>
                        </text>
                    </svg>
                </div>

                {/* ข้อความชักชวน (อยู่ด้านบน QR Code) */}
                <div className="text-center ">
                    <p className="text-5xl font-bold text-white tracking-widest drop-shadow-lg mb-5">
                        <span className="text-red-500">สแกน</span>
                        <span className="text-yellow-500">ขึ้น</span>
                        <span className="text-blue-500">จอ</span>
                    </p>
                </div>

                {src && (
                    <div className="relative  bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl">
                        <Image
                            src={src}
                            alt="Instagram QR"
                            width={380}
                            height={380}
                            className="rounded-2xl"
                        />
                    </div>
                )}

            </div>

            {/* แสง overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.18),transparent_65%)]" />

        </div>
    );
}