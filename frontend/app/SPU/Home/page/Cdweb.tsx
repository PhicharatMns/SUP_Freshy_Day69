'use client'
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
        <div className="relative w-full h-screen overflow-hidden ">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center z-50 gap-4 md:gap-6 px-4">

                {/* SVG Text โค้ง */}
                <div className="flex items-center justify-center w-full max-w-[620px] -mt-12 md:-mt-20 -mb-2 md:-mb-4">
                    <svg width="100%" height="auto" viewBox="0 0 620 220" className="drop-shadow-2xl overflow-visible">
                        {/* เพิ่ม height และ viewBox Y เพื่อเผื่อพื้นที่ให้เงา (Glow) ไม่ถูกตัด */}
                        <defs>
                            <path
                                id="curve"
                                d="M 40 170 Q 310 45 580 170" /* ปรับ Y ลงมานิดหน่อย */
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
                                {/* แยกตัวอักษรและหน่วงเวลา */}
                                <tspan fill="#ef4444" className="animate-scale-letter glow-red" style={{ animationDelay: '0s' }}>S</tspan>
                                <tspan fill="#ef4444" className="animate-scale-letter glow-red" style={{ animationDelay: '0.1s' }}>C</tspan>
                                <tspan fill="#fbbf24" className="animate-scale-letter glow-yellow" style={{ animationDelay: '0.2s' }}>A</tspan>
                                <tspan fill="#fbbf24" className="animate-scale-letter glow-yellow" style={{ animationDelay: '0.3s' }}>N</tspan>
                                <tspan> </tspan>
                                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.4s' }}>H</tspan>
                                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.5s' }}>E</tspan>
                                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.6s' }}>R</tspan>
                                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.7s' }}>E</tspan>
                            </textPath>
                        </text>
                    </svg>
                </div>

                {/* ข้อความชักชวน */}
                <div className="text-center mb-4 md:mb-6">
                    <p className="text-3xl md:text-5xl font-bold text-white tracking-widest drop-shadow-lg">
                        <span className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">สแกน</span>
                        <span className="text-yellow-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">ขึ้น</span>
                        <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">จอ</span>
                    </p>
                </div>

                {/* QR Code ที่เด้ง */}
                {src && (
                    <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl animate-bounce-slow p-2 md:p-0">
                        <Image
                            priority={true}
                            src={src}
                            alt="Instagram QR"
                            width={380}
                            height={380}
                            className="w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[380px] md:h-[380px] rounded-xl md:rounded-2xl"
                        />
                    </div>
                )}

            </div>

            {/* แสง overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.18),transparent_65%)]" />

            {/* CSS Styles */}
            <style jsx global>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 7s ease-in-out infinite;
                }
                @keyframes floatBubble {
                    0% { transform: translateY(0) scale(1); }
                    100% { transform: translateY(-120vh) scale(0.8); }
                }

                /* Keyframes สำหรับขยายตัวอักษรและเรืองแสง */
                @keyframes scaleLetter {
                    0%, 100% {
                        font-size: 68px;
                        filter: drop-shadow(0px 0px 0px transparent);
                    }
                    15% {
                        font-size: 85px;
                        /* เงาพื้นฐานตอนเด้งสุด */
                        filter: drop-shadow(0px 0px 12px currentColor);
                    }
                }

                .animate-scale-letter {
                    animation: scaleLetter 1.8s ease-in-out infinite;
                    /* ทำให้ currentColor อ้างอิงตามสี fill ได้ (ในบางเบราว์เซอร์) แต่เราจะแยกคลาสสีให้ชัวร์กว่า */
                }

                /* แยกสี Glow ให้ตรงกับตัวอักษร */
                .glow-red {
                    --glow-color: rgba(239, 68, 68, 0.8);
                }
                .glow-yellow {
                    --glow-color: rgba(251, 191, 36, 0.8);
                }
                .glow-blue {
                    --glow-color: rgba(59, 130, 246, 0.8);
                }

                /* อัปเดต Keyframes แบบเจาะจงสีผ่าน CSS Variable (ถ้าเบราว์เซอร์รองรับ) หรือใช้ Filter ตรงๆ */
                 @keyframes scaleLetterRed {
                    0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
                    15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(239, 68, 68, 1)); }
                }
                @keyframes scaleLetterYellow {
                    0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
                    15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(251, 191, 36, 1)); }
                }
                @keyframes scaleLetterBlue {
                    0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
                    15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(59, 130, 246, 1)); }
                }

                .animate-scale-letter.glow-red { animation: scaleLetterRed 1.8s ease-in-out infinite; }
                .animate-scale-letter.glow-yellow { animation: scaleLetterYellow 1.8s ease-in-out infinite; }
                .animate-scale-letter.glow-blue { animation: scaleLetterBlue 1.8s ease-in-out infinite; }
            `}</style>
        </div>
    );
}