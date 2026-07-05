// 'use client'
// import { useEffect, useState } from "react";
// import QRCode from 'qrcode';
// import Image from "next/image";

// interface Bubble {
//     id: number;
//     color: string;
//     size: number;
//     duration: number;
//     left: string;
//     delay: string;
//     opacity: number;
// }

// export default function Cdweb() {
//     const [src, setSrc] = useState('');
//     const [bubbles, setBubbles] = useState<Bubble[]>([]);

//     useEffect(() => {
//         // สร้าง QR Code
//         const generateQR = async () => {
//             try {
//                 const url = await QRCode.toDataURL('https://gt2nzzlc-3000.asse.devtunnels.ms/Freshy69');
//                 setSrc(url);
//             } catch (err) {
//                 console.error("เกิดข้อผิดพลาดในการสร้าง QR Code:", err);
//             }
//         };
//         generateQR();

//         // สุ่มสร้างฟองสบู่
//         const bubbleColors = [
//             'bg-white', 'bg-sky-300', 'bg-purple-300', 'bg-pink-300',
//             'bg-emerald-300', 'bg-violet-300', 'bg-rose-300', 'bg-cyan-300'
//         ];
        
//         const generatedBubbles = Array.from({ length: 30 }).map((_, i) => ({
//             id: i,
//             color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
//             size: 13 + Math.random() * 27,
//             duration: 4 + Math.random() * 9,
//             left: `${Math.random() * 100}%`,
//             delay: `-${Math.random() * 15}s`,
//             opacity: 0.85 + Math.random() * 0.15,
//         }));
//         setBubbles(generatedBubbles);
//     }, []);

//     return (
//         // ใช้ min-h-screen เพื่อให้รองรับมือถือจอเตี้ย และอนุญาตให้ scroll ได้ถ้าเนื้อหาแน่นเกินไป
//         <div className="relative w-full min-h-screen overflow-hidden  flex flex-col items-center justify-center py-8">
            
//             {/* พื้นหลังไล่สี */}
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.18),transparent_65%)] pointer-events-none" />

//             {/* ฟองสบู่ลอย */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//                 {bubbles.map((bubble) => (
//                     <div
//                         key={bubble.id}
//                         className={`absolute bottom-[-60px] rounded-full ${bubble.color}
//                                     shadow-[0_0_18px_#fff,0_0_32px_rgba(255,255,255,0.5),inset_8px_8px_12px_rgba(255,255,255,0.9)]
//                                     ring-1 ring-white/50 animate-[floatBubble_linear_infinite]`}
//                         style={{
//                             left: bubble.left,
//                             width: `${bubble.size}px`,
//                             height: `${bubble.size}px`,
//                             animationDuration: `${bubble.duration}s`,
//                             animationDelay: bubble.delay,
//                             opacity: bubble.opacity,
//                         }}
//                     />
//                 ))}
//             </div>

//             {/* เนื้อหาหลัก */}
//             <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 gap-4 sm:gap-6">

//                 {/* SVG Text โค้ง */}
//                 {/* ลด margin ด้านบนลงบนมือถือ เพื่อไม่ให้กินพื้นที่ */}
//                 <div className="flex items-center justify-center w-full max-w-[620px] -mt-6 sm:-mt-12 md:-mt-20 -mb-2 sm:-mb-6">
//                     {/* ปรับ viewBox เผื่อพื้นที่แกน Y (0 0 620 260) ให้เงาและฟอนต์ที่ขยายใหญ่สุดไม่โดนตัดขอบ */}
//                     <svg width="100%" height="auto" viewBox="0 0 620 260" className="drop-shadow-2xl overflow-visible">
//                         <defs>
//                             {/* ขยับ Y ลงมาให้มีพื้นที่ด้านบนสำหรับฟอนต์ที่ขยายขนาด */}
//                             <path
//                                 id="curve"
//                                 d="M 40 200 Q 310 60 580 200" 
//                             />
//                         </defs>
//                         <text
//                             className="font-luckiest-guy text-6xl md:text-[90px]"

//                             fontWeight="900"
//                             letterSpacing="6"
//                             textAnchor="middle"
//                         >
//                             <textPath href="#curve" startOffset="50%">
//                                 <tspan fill="#ef4444" className="animate-scale-letter glow-red" style={{ animationDelay: '0s' }}>S</tspan>
//                                 <tspan fill="#ef4444" className="animate-scale-letter glow-red" style={{ animationDelay: '0.1s' }}>C</tspan>
//                                 <tspan fill="#ef4444" className="animate-scale-letter glow-yellow" style={{ animationDelay: '0.2s' }}>A</tspan>
//                                 <tspan fill="#ef4444" className="animate-scale-letter glow-yellow" style={{ animationDelay: '0.3s' }}>N</tspan>
//                                 <tspan> </tspan>
//                                 <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.4s' }}>H</tspan>
//                                 <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.5s' }}>E</tspan>
//                                 <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.6s' }}>R</tspan>
//                                 <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: '0.7s' }}>E</tspan>
//                             </textPath>
//                         </text>
//                     </svg>
//                 </div>

//                 {/* ข้อความชักชวน */}
//                 <div className="text-center z-10">
//                     {/* ปรับขนาดฟอนต์บนมือถือให้เล็กลงเล็กน้อย (text-2xl) */}
//                     {/* <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-white tracking-widest drop-shadow-lg mb-2 md:mb-0">
//                         <span className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">สแกน</span>
//                         <span className="text-yellow-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">ขึ้น</span>
//                         <span className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">จอ</span>
//                     </p> */}
//                 </div>

//                 {/* QR Code ที่เด้ง */}
//                 <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl animate-bounce-slow p-2 sm:p-3 md:p-4 z-10">
//                     {!src ? (
//                         <div className="w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] rounded-xl md:rounded-2xl bg-slate-100 animate-pulse flex items-center justify-center">
//                             <div className="w-12 h-12 md:w-20 md:h-20 border-4 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
//                         </div>
//                     ) : (
//                         <div className="relative w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px]">
//                             <Image
//                                 priority
//                                 fill
//                                 src={src}
//                                 alt="Instagram QR"
//                                 className="object-contain rounded-xl md:rounded-2xl"
//                             />
//                         </div>
//                     )}
//                 </div>
//             </div>

//             <style>{`
//                 @keyframes bounce-slow {
//                     0%, 100% { transform: translateY(0); }
//                     50% { transform: translateY(-15px); }
//                 }
//                 .animate-bounce-slow {
//                     animation: bounce-slow 7s ease-in-out infinite;
//                 }
//                 @keyframes floatBubble {
//                     0% { transform: translateY(10vh) scale(1); }
//                     100% { transform: translateY(-120vh) scale(0.8); }
//                 }

//                 /* แยกสี Glow ให้ตรงกับตัวอักษร */
//                 @keyframes scaleLetterRed {
//                     0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
//                     15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(239, 68, 68, 0.9)); }
//                 }
//                 @keyframes scaleLetterYellow {
//                     0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
//                     15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(251, 191, 36, 0.9)); }
//                 }
//                 @keyframes scaleLetterBlue {
//                     0%, 100% { font-size: 68px; filter: drop-shadow(0px 0px 0px transparent); }
//                     15% { font-size: 85px; filter: drop-shadow(0px 0px 15px rgba(59, 130, 246, 0.9)); }
//                 }

//                 .animate-scale-letter.glow-red { animation: scaleLetterRed 1.8s ease-in-out infinite; }
//                 .animate-scale-letter.glow-yellow { animation: scaleLetterYellow 1.8s ease-in-out infinite; }
//                 .animate-scale-letter.glow-blue { animation: scaleLetterBlue 1.8s ease-in-out infinite; }
//             `}</style>
//         </div>
//     );
// }

"use client";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
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
  const [src, setSrc] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  // ตำแหน่ง QR สำหรับเด้งชนขอบจอ
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const posRef = useRef({ x: 100, y: 100 });
  const velRef = useRef({ vx: 2.2, vy: 1.8 });
  const boxSizeRef = useRef(360); // ขนาดกล่อง QR (จะอัปเดตตาม responsive)
  const boundsRef = useRef({ minX: 24, maxX: 0, minY: 24, maxY: 0 });
  const qrRef = useRef<HTMLDivElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // สร้าง QR
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(
          "https://gt2nzzlc-3000.asse.devtunnels.ms/Freshy69"
        );
        setSrc(url);
      } catch (err) {
        console.error(err);
      }
    };
    generateQR();

    // ฟองสบู่
    const bubbleColors = [
      "bg-white",
      "bg-sky-300",
      "bg-purple-300",
      "bg-pink-300",
      "bg-emerald-300",
      "bg-violet-300",
      "bg-rose-300",
      "bg-cyan-300",
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

    // ========= วนหมุน 15 วิ / หยุด 30 วิ ไปเรื่อยๆ =========
    const SPIN_DURATION = 15000; // หมุน 15 วิ
    const PAUSE_DURATION = 30000; // หยุด 30 วิ
    let timer: ReturnType<typeof setTimeout>;

    const cycle = (spinning: boolean) => {
      setIsSpinning(spinning);
      timer = setTimeout(
        () => cycle(!spinning),
        spinning ? SPIN_DURATION : PAUSE_DURATION
      );
    };

    cycle(false);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // ตั้งขนาดกล่อง QR และกำหนดขอบของพื้นที่เล่น
  useEffect(() => {
    const updateBounds = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      const measured = qrRef.current?.getBoundingClientRect();
      const measuredSize = measured && measured.width > 0 && measured.height > 0
        ? Math.max(Math.ceil(measured.width), Math.ceil(measured.height))
        : 0;

      if (measuredSize > 0) {
        boxSizeRef.current = measuredSize;
      } else if (w >= 768) {
        boxSizeRef.current = 360 + 16;
      } else if (w >= 640) {
        boxSizeRef.current = 280 + 12;
      } else {
        boxSizeRef.current = 200 + 8;
      }

      const minX = 24;
      const topOffset = w >= 768 ? 150 : 100;
      const maxX = Math.max(minX, Math.floor(w - boxSizeRef.current - 24));
      const minY = topOffset;
      const maxY = Math.max(minY, Math.floor(h - boxSizeRef.current - 24));

      boundsRef.current = { minX, maxX, minY, maxY };

      const nextX = Math.min(Math.max(posRef.current.x, minX), maxX);
      const nextY = Math.min(Math.max(posRef.current.y, minY), maxY);
      posRef.current = { x: nextX, y: nextY };
      setPos({ x: nextX, y: nextY });
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  // ========= Physics loop: เด้งชนขอบจอ + popcat score + message แบบ DVD =========
  useEffect(() => {
    const startX = Math.min(
      Math.max(boundsRef.current.minX, window.innerWidth / 2 - boxSizeRef.current / 2),
      boundsRef.current.maxX
    );
    const startY = Math.min(
      Math.max(boundsRef.current.minY, window.innerHeight / 2 - boxSizeRef.current / 2),
      boundsRef.current.maxY
    );

    posRef.current = { x: startX, y: startY };
    setPos({ ...posRef.current });

    const getObstacleRects = () => {
      const obstacles: Array<{ left: number; top: number; right: number; bottom: number }> = [];
      const messageBox = document.getElementById("message-panel-card");
      const popcarBox = document.getElementById("popcar-score-card");
      const scanBox = scanRef.current;

      if (scanBox) {
        const rect = scanBox.getBoundingClientRect();
        obstacles.push({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
      }

      if (messageBox) {
        const rect = messageBox.getBoundingClientRect();
        obstacles.push({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
      }

      if (popcarBox) {
        const rect = popcarBox.getBoundingClientRect();
        obstacles.push({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom });
      }

      return obstacles;
    };

    const step = () => {
      const { minX, maxX, minY, maxY } = boundsRef.current;

      let { x, y } = posRef.current;
      let { vx, vy } = velRef.current;

      const nextX = x + vx;
      const nextY = y + vy;
      const nextRight = nextX + boxSizeRef.current;
      const nextBottom = nextY + boxSizeRef.current;

      x = nextX;
      y = nextY;

      const obstacles = getObstacleRects();

      for (const rect of obstacles) {
        const intersects =
          nextRight > rect.left &&
          nextX < rect.right &&
          nextBottom > rect.top &&
          nextY < rect.bottom;

        if (!intersects) continue;

        const bounceFactor = 0.94;
        const overlapX = Math.min(nextRight - rect.left, rect.right - nextX);
        const overlapY = Math.min(nextBottom - rect.top, rect.bottom - nextY);

        if (overlapX < overlapY) {
          if (vx > 0) {
            x = rect.left - boxSizeRef.current;
            vx = -Math.abs(vx) * bounceFactor;
          } else {
            x = rect.right;
            vx = Math.abs(vx) * bounceFactor;
          }
        } else {
          if (vy > 0) {
            y = rect.top - boxSizeRef.current;
            vy = -Math.abs(vy) * bounceFactor;
          } else {
            y = rect.bottom;
            vy = Math.abs(vy) * bounceFactor;
          }
        }

        // apply the resolved position back to the current target for remaining checks
        const correctedRight = x + boxSizeRef.current;
        const correctedBottom = y + boxSizeRef.current;
        if (correctedRight <= rect.left || x >= rect.right || correctedBottom <= rect.top || y >= rect.bottom) {
          // corrected outside obstacle
        }
        break;
      }

      if (x <= minX) {
        x = minX;
        vx = Math.abs(vx) * 0.96;
      } else if (x >= maxX) {
        x = maxX;
        vx = -Math.abs(vx) * 0.96;
      }

      if (y <= minY) {
        y = minY;
        vy = Math.abs(vy) * 0.96;
      } else if (y >= maxY) {
        y = maxY;
        vy = -Math.abs(vy) * 0.96;
      }

      posRef.current = { x, y };
      velRef.current = { vx, vy };
      setPos({ x, y });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-8">
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

      {/* SVG Text โค้ง - ปรับตำแหน่งลงมาพอดี */}
      <div className="absolute top-24 md:top-20 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center justify-center w-full max-w-4xl px-4 gap-4 sm:gap-6">
        <div
          ref={scanRef}
          className="flex items-center justify-center w-full max-w-[620px] -mt-0 sm:-mt-2 md:-mt-4 -mb-1 sm:-mb-2"
        >
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 620 260"
            className="drop-shadow-2xl overflow-visible"
          >
            <defs>
              <path id="curve" d="M 40 200 Q 310 60 580 200" />
            </defs>
            <text
              className="font-luckiest-guy text-6xl md:text-[90px]"
              fontWeight="900"
              letterSpacing="6"
              textAnchor="middle"
            >
              <textPath href="#curve" startOffset="50%">
                <tspan fill="#ef4444" className="animate-scale-letter glow-red" style={{ animationDelay: "0s" }}>S</tspan>
                <tspan fill="#ef4444" className="animate-scale-letter glow-red" style={{ animationDelay: "0.1s" }}>C</tspan>
                <tspan fill="#ef4444" className="animate-scale-letter glow-yellow" style={{ animationDelay: "0.2s" }}>A</tspan>
                <tspan fill="#ef4444" className="animate-scale-letter glow-yellow" style={{ animationDelay: "0.3s" }}>N</tspan>
                <tspan> </tspan>
                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: "0.4s" }}>H</tspan>
                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: "0.5s" }}>E</tspan>
                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: "0.6s" }}>R</tspan>
                <tspan fill="#3b82f6" className="animate-scale-letter glow-blue" style={{ animationDelay: "0.7s" }}>E</tspan>
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* QR Code ที่เด้งชนขอบจอ + หมุน + สั่น */}
      <div
        ref={qrRef}
        className={`fixed bg-white/95 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl p-2 sm:p-3 md:p-4 z-20 ${
          isSpinning ? "animate-spin-slow" : ""
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
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

      <style jsx global>{`
        @keyframes spin-shake-qr {
          0% { transform: rotate(0deg) translate(0, 0) scale(1); }
          5% { transform: rotate(18deg) translate(-4px, -3px) scale(1.15); }
          10% { transform: rotate(36deg) translate(-3px, -2px) scale(0.9); }
          15% { transform: rotate(54deg) translate(4px, 3px) scale(1.2); }
          20% { transform: rotate(72deg) translate(3px, 2px) scale(0.95); }
          30% { transform: rotate(108deg) translate(-3px, 2px) scale(1.1); }
          40% { transform: rotate(144deg) translate(3px, -2px) scale(0.9); }
          50% { transform: rotate(180deg) translate(-2px, 2px) scale(1.15); }
          60% { transform: rotate(216deg) translate(2px, -2px) scale(0.95); }
          70% { transform: rotate(252deg) translate(-2px, -1px) scale(1.1); }
          80% { transform: rotate(288deg) translate(2px, 1px) scale(0.9); }
          90% { transform: rotate(324deg) translate(-1px, 1px) scale(1.05); }
          100% { transform: rotate(360deg) translate(0, 0) scale(1); }
        }

        .animate-spin-slow {
          animation: spin-shake-qr 0.70s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
          will-change: transform;
        }

        @keyframes floatBubble {
          0% { transform: translateY(10vh) scale(1); }
          100% { transform: translateY(-120vh) scale(0.8); }
        }

        @keyframes scaleLetterRed {
          0%, 100% { font-size: 68px; filter: drop-shadow(0 0 0 transparent); }
          15% { font-size: 85px; filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.9)); }
        }

        @keyframes scaleLetterYellow {
          0%, 100% { font-size: 68px; filter: drop-shadow(0 0 0 transparent); }
          15% { font-size: 85px; filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.9)); }
        }

        @keyframes scaleLetterBlue {
          0%, 100% { font-size: 68px; filter: drop-shadow(0 0 0 transparent); }
          15% { font-size: 85px; filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.9)); }
        }

        .animate-scale-letter.glow-red { animation: scaleLetterRed 1.8s ease-in-out infinite; }
        .animate-scale-letter.glow-yellow { animation: scaleLetterYellow 1.8s ease-in-out infinite; }
        .animate-scale-letter.glow-blue { animation: scaleLetterBlue 1.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}