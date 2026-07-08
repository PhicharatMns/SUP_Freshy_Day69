"use client";

import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";
import { post, postFronend } from "@/app/Post";

interface Bubble {
  id: number;
  color: string;
  size: number;
  duration: number;
  left: string;
  delay: string;
  opacity: number;
}

interface CdwebProps {
  speed?: "normal" | "slow";
}

export default function Cdweb({ speed = "normal" }: CdwebProps) {
  const [src, setSrc] = useState("");
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [isSpinning, setIsSpinning] = useState(false);

  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [boxSize, setBoxSize] = useState(380); // ⚡ เก็บขนาดกล่อง QR Code เพื่อเอาไปวาดแบบไดนามิก


  const posRef = useRef({ x: 100, y: 100 });
  
  // ⚡ กำหนดระดับความเร็วในการเด้งชนขอบจอตามพารามิเตอร์ที่ส่งเข้ามา
  const velRef = useRef(
    speed === "slow" 
      ? { vx: 1.4, vy: 0.9 } // ปรับให้ขยับว่องไวขึ้น เพื่อความสวยงามบนจอใหญ่
      : { vx: 2.2, vy: 1.8 }  // ความเร็วปกติสำหรับจอกลางใหญ่
  );

  const boxSizeRef = useRef(380);

  const boundsRef = useRef({
    minX: 24,
    maxX: 0,
    minY: 120,
    maxY: 0,
  });

  const qrRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(
          `${postFronend}/Freshy69`
        );
        setSrc(url);
      } catch (err) {
        console.error(err);
      }
    };

    generateQR();

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

    setBubbles(
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        size: 13 + Math.random() * 27,
        duration: 4 + Math.random() * 9,
        left: `${Math.random() * 100}%`,
        delay: `-${Math.random() * 15}s`,
        opacity: 0.85 + Math.random() * 0.15,
      }))
    );

    const SPIN = 15000;
    const STOP = 30000;

    let timer: NodeJS.Timeout;

    const loop = (spin: boolean) => {
      setIsSpinning(spin);
      timer = setTimeout(() => loop(!spin), spin ? SPIN : STOP);
    };

    loop(false);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateBounds = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // ⚡ หากเป็นจอแนวตั้ง (สูงมากกว่ากว้าง) ให้ขนาดกว้าง 55% ของหน้าจอ สูงสุดไม่เกิน 600px
      const isPortrait = h > w;
      const size = isPortrait
        ? Math.max(300, Math.min(Math.ceil(w * 0.55), 600))
        : w >= 768
          ? 380
          : w >= 640
            ? 280
            : 200;

      boxSizeRef.current = size;
      setBoxSize(size);

      const playWidth = Math.min(900, w);
      const areaLeft = (w - playWidth) / 2;

      const minX = areaLeft + 24;
      const maxX = areaLeft + playWidth - size - 24;

      const minY = w >= 768 ? 260 : 220;
      const maxY = Math.max(minY, h - size - 24);

      boundsRef.current = {
        minX,
        maxX,
        minY,
        maxY,
      };
    };

    updateBounds();

    window.addEventListener("resize", updateBounds);

    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  useEffect(() => {
    const startX =
      window.innerWidth / 2 - boxSizeRef.current / 2;

    const startY =
      window.innerHeight / 2 - boxSizeRef.current / 2;

    posRef.current = {
      x: startX,
      y: startY,
    };

    const step = () => {
      const { minX, maxX, minY, maxY } = boundsRef.current;

      let { x, y } = posRef.current;
      let { vx, vy } = velRef.current;

      x += vx;
      y += vy;

      if (x <= minX || x >= maxX) vx *= -1;
      if (y <= minY || y >= maxY) vy *= -1;

      x = Math.max(minX, Math.min(maxX, x));
      y = Math.max(minY, Math.min(maxY, y));

      posRef.current = { x, y };
      velRef.current = { vx, vy };

      setPos({ x, y });

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center py-8">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.18),transparent_65%)] pointer-events-none" />

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

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 gap-4 sm:gap-6">

        <div className="flex items-center justify-center w-full max-w-[750x] -mt-6 sm:-mt-12 md:-mt-120 -mb-2 sm:-mb-6">
          <svg
            width="100%"
            viewBox="0 0 620 260"
            className="drop-shadow-2xl overflow-visible"
          >
            <defs>
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

      <div
        ref={qrRef}
        className={`fixed bg-white/95 backdrop-blur-sm rounded-[32px] shadow-2xl p-4 z-20 flex items-center justify-center ${isSpinning ? "animate-spin-qr" : ""
          }`}
        style={{
          left: pos.x,
          top: pos.y,
          width: `${boxSize}px`,
          height: `${boxSize}px`,
        }}
      >
        {!src ? (
          <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl" />
        ) : (
          <div className="relative w-full h-full">
            <Image
              fill
              priority
              src={src}
              alt="qr"
              className="object-contain rounded-2xl"
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes floatBubble {
          0% {
            transform: translateY(10vh) scale(1);
          }
          100% {
            transform: translateY(-120vh) scale(0.8);
          }
        }

        @keyframes spinQR {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-qr {
          animation: spinQR 0.8s linear infinite;
        }

        @keyframes scaleLetterRed {
          0%,100% {
            font-size:68px;
            filter:drop-shadow(0 0 0 transparent);
          }
          15% {
            font-size:85px;
            filter:drop-shadow(0 0 15px rgba(239,68,68,.9));
          }
        }

        @keyframes scaleLetterYellow {
          0%,100% {
            font-size:68px;
            filter:drop-shadow(0 0 0 transparent);
          }
          15% {
            font-size:85px;
            filter:drop-shadow(0 0 15px rgba(251,191,36,.9));
          }
        }

        @keyframes scaleLetterBlue {
          0%,100% {
            font-size:68px;
            filter:drop-shadow(0 0 0 transparent);
          }
          15% {
            font-size:85px;
            filter:drop-shadow(0 0 15px rgba(59,130,246,.9));
          }
        }

        .animate-scale-letter.glow-red {
          animation: scaleLetterRed 1.8s ease-in-out infinite;
        }

        .animate-scale-letter.glow-yellow {
          animation: scaleLetterYellow 1.8s ease-in-out infinite;
        }

        .animate-scale-letter.glow-blue {
          animation: scaleLetterBlue 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}