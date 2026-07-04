'use client'
import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import Image from "next/image";

interface Bubble {
    id: number;
    color: string;
    size: number;
    duration: number;
    left: string;
    delay: string;
    opacity: number;
}

export default function Cdweb() {
    const [src, setSrc] = useState('');
    const [bubbles, setBubbles] = useState<Bubble[]>([]);

    useEffect(() => {
        // สร้าง QR Code
        const generateQR = async () => {
            try {
                const url = await QRCode.toDataURL('https://www.instagram.com/bp_mnnn/');
                setSrc(url);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการสร้าง QR Code:", err);
            }
        };
        generateQR();

        // สุ่มสร้างฟองสบู่
        const bubbleColors = [
            'bg-white', 'bg-sky-300', 'bg-purple-300', 'bg-pink-300',
            'bg-emerald-300', 'bg-violet-300', 'bg-rose-300', 'bg-cyan-300'
        ];
        
        const generatedBubbles = Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
            size: 13 + Math.random() * 27,
            duration: 4 + Math.random() * 9,
            left: `${Math.random() * 100}%`,
            delay: `-${Math.random() * 15}s`,
            opacity: 0.85 + Math.random() * 0.15,
        }));
        setBubbles(generatedBubbles);
    }, []);

    return (
        // ใช้ min-h-screen เพื่อให้รองรับมือถือจอเตี้ย และอนุญาตให้ scroll ได้ถ้าเนื้อหาแน่นเกินไป
        <div className="relative w-full min-h-screen overflow-hidden  flex flex-col items-center justify-center py-8">
            
            {/* พื้นหลังไล่สี */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.18),transparent_65%)] pointer-events-none" />

            {/* ฟองสบู่ลอย */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {bubbles.map((bubble) => (
                    <div
                        key={bubble.id}
                        className={`absolute bottom-[-60px] rounded-full ${bubble.color}
                                    shadow-[0_0_18px_#fff,0_0_32px_rgba(255,255,255,0.5),inset_8px_8px_12px_rgba(255,255,255,0.9)]
                                    ring-1 ring-white/50 animate-[floatBubble_linear_infinite]`}
                        style={{
                            left: bubble.left,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`,
                            animationDuration: `${bubble.duration}s`,
                            animationDelay: bubble.delay,
                            opacity: bubble.opacity,
                        }}
                    />
                ))}
            </div>

            {/* เนื้อหาหลัก */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 gap-4 sm:gap-6">

                {/* SVG Text โค้ง */}
                {/* ลด margin ด้านบนลงบนมือถือ เพื่อไม่ให้กินพื้นที่ */}
                <div className="flex items-center justify-center w-full max-w-[620px] -mt-6 sm:-mt-12 md:-mt-20 -mb-2 sm:-mb-6">
                    {/* ปรับ viewBox เผื่อพื้นที่แกน Y (0 0 620 260) ให้เงาและฟอนต์ที่ขยายใหญ่สุดไม่โดนตัดขอบ */}
                    <svg width="100%" height="auto" viewBox="0 0 620 260" className="drop-shadow-2xl overflow-visible">
                        <defs>
                            {/* ขยับ Y ลงมาให้มีพื้นที่ด้านบนสำหรับฟอนต์ที่ขยายขนาด */}
                            <path
                                id="curve"
                                d="M 40 200 Q 310 60 580 200" 
                            />
                        </defs>
                        <text
                            className="font-luckiest-guy text-6xl md:text-[90px]"

                            fontWeight="900"
                            letterSpacing="6"
                            textAnchor="middle"
                        >
                            <textPath href="#curve" startOffset="50%">
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
                <div className="text-center z-10">
                    {/* ปรับขนาดฟอนต์บนมือถือให้เล็กลงเล็กน้อย (text-2xl) */}
                    <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-widest drop-shadow-lg mb-2 md:mb-0">
                        <span className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">สแกน</span>
                        <span className="text-yellow-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">ขึ้น</span>
                        <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">จอ</span>
                    </p>
                </div>

                {/* QR Code ที่เด้ง */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl animate-bounce-slow p-2 sm:p-3 md:p-4 z-10">
                    {!src ? (
                        <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] rounded-xl md:rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
                            <div className="w-12 h-12 md:w-20 md:h-20 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px]">
                            <Image
                                priority
                                fill
                                src={src}
                                alt="Instagram QR"
                                className="object-contain rounded-xl md:rounded-2xl"
                            />
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 7s ease-in-out infinite;
                }
                @keyframes floatBubble {
                    0% { transform: translateY(10vh) scale(1); }
                    100% { transform: translateY(-120vh) scale(0.8); }
                }

                /* แยกสี Glow ให้ตรงกับตัวอักษร */
                @keyframes scaleLetterRed {
                    0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
                    15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(239, 68, 68, 0.9)); }
                }
                @keyframes scaleLetterYellow {
                    0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
                    15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(251, 191, 36, 0.9)); }
                }
                @keyframes scaleLetterBlue {
                    0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
                    15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(59, 130, 246, 0.9)); }
                }

                .animate-scale-letter.glow-red { animation: scaleLetterRed 1.8s ease-in-out infinite; }
                .animate-scale-letter.glow-yellow { animation: scaleLetterYellow 1.8s ease-in-out infinite; }
                .animate-scale-letter.glow-blue { animation: scaleLetterBlue 1.8s ease-in-out infinite; }
            `}</style>
        </div>
    );
}