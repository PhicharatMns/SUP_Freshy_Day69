"use client";

import QRCode from "qrcode";
import { post } from "@/app/Post";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IGData {
  id: number;
  name: string;
  ig_account?: string;
  image_url?: string;
  quote_text?: string;
  type?: string; // คณะ
  created_at?: string;
}

interface ScanProps {
  onActivePostChange?: (active: boolean) => void;
}

export default function Scan({ onActivePostChange }: ScanProps) {
  const [current, setCurrent] = useState<IGData | null>(null);
  const [qr, setQr] = useState("");
  
  // คิวสำหรับรูปใหม่ที่รอการแจ้งเตือน (Approve แล้ว)
  const [activeQueue, setActiveQueue] = useState<IGData[]>([]);
  // รายการประวัติรูปเก่าทั้งหมด (สำหรับวนลูปสไลด์โชว์เวลาไม่มีรูปใหม่)
  const [historyLoop, setHistoryLoop] = useState<IGData[]>([]);
  
  const shownIds = useRef<Set<number>>(new Set());
  const historyIndex = useRef<number>(0);
  const isDisplayingPriority = useRef<boolean>(false);

  const [trigger, setTrigger] = useState(0);
  const forceRotate = () => setTrigger((t) => t + 1);

  // ================= 1. FETCH HISTORICAL DATA (ดึงภาพเก่ามาวนลูป) =================
  const fetchHistory = async () => {
    try {
      const res = await fetch(`${post}/ig_my/select-ig?t=${Date.now()}`);
      const result = await res.json();
      if (result.success && result.data) {
        const rawPosts: IGData[] = result.data;
        
        // ⏱️ คัดกรองเอาเฉพาะโพสต์ที่มีอายุมากกว่า 5 วินาทีแล้วเท่านั้น สำหรับแสดงผลบนจอหลัก
        const fetchedPosts = rawPosts.filter((p) => {
          const createdAt = p.created_at ? new Date(p.created_at).getTime() : Date.now();
          return Date.now() - createdAt >= 5000;
        });

        setHistoryLoop(fetchedPosts);

        // 🚨 CLEAR DELETED: หากแอดมินลบภาพไปแล้ว ให้กวาดล้างออกจากคิวที่กักเวลารออยู่ด้วย
        setActiveQueue((prev) => prev.filter((p) => rawPosts.some((r) => r.id === p.id)));

        // 🚨 REAL-TIME CHECK: ตรวจสอบว่ารูปที่กำลังเปิดอยู่หน้าจอ ณ วินาทีนี้ โดนแอนิเมชันลบออกแล้วหรือยัง?
        setCurrent((prevCurrent) => {
          if (prevCurrent) {
            const exists = rawPosts.some((p) => p.id === prevCurrent.id);
            if (!exists) {
              // ถ้าไม่อยู่แล้ว แปลว่าโดนลบ ➔ ให้สั่งหมุนสไลด์เปลี่ยนเป็นรูปอื่นทันที!
              setTimeout(forceRotate, 50);
              return null;
            }
          }
          return prevCurrent;
        });
      }
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  // ================= 2. POLL NEW POPUPS (คอยดึงรูปใหม่ที่เพิ่งแอดมินอนุมัติ) =================
  const checkNewPopup = async () => {
    try {
      const res = await fetch(`${post}/ig_my/next-popup?t=${Date.now()}`);
      const result = await res.json();

      if (result.success && result.data) {
        const newPost: IGData = result.data;
        // ป้องกันการแอดซ้ำซ้อน
        if (!shownIds.current.has(newPost.id)) {
          shownIds.current.add(newPost.id);
          
          // ⏱️ หน่วงเวลารอ 5 วินาทีนับจากช่วงเวลาสร้างโพสต์ (Created At) ก่อนปล่อยให้ไหลเข้าจอใหญ่
          const createdAt = newPost.created_at ? new Date(newPost.created_at).getTime() : Date.now();
          const elapsed = Date.now() - createdAt;
          const delayRemaining = Math.max(0, 5000 - elapsed);

          setTimeout(() => {
            setActiveQueue((prev) => [...prev, newPost]);
          }, delayRemaining);
        }
      }
    } catch (err) {
      console.error("Fetch new popup error:", err);
    }
  };

  // ดึงประวัติครั้งแรก และตั้งช่วงเวลาตรวจสอบโพสต์ใหม่
  useEffect(() => {
    fetchHistory();
    // คอยตรวจคิวโพสต์ใหม่ทุก 3 วินาที
    const popupInterval = setInterval(checkNewPopup, 3000);
    // อัปเดตประวัติสไลด์โชว์เพื่อตรวจจับการลบแบบ Real-time ทุกๆ 3 วินาที
    const historyInterval = setInterval(fetchHistory, 3000);

    return () => {
      clearInterval(popupInterval);
      clearInterval(historyInterval);
    };
  }, []);

  // ================= 3. LOOP ROTATION (จัดการสลับสไลด์ทุกๆ 8 วินาที) =================
  useEffect(() => {
    const rotateSlide = () => {
      setActiveQueue((prevQueue) => {
        if (prevQueue.length > 0) {
          // A. มีคิวรูปใหม่: หยิบรูปแรกขึ้นมาแสดงทันที
          const nextPost = prevQueue[0];
          const remainingQueue = prevQueue.slice(1);

          isDisplayingPriority.current = true;
          setCurrent(nextPost);

          // อัปเดตเข้ารายการประวัติ (เพื่อไว้เล่นวนซ้ำทีหลัง)
          setHistoryLoop((prevHistory) => {
            if (!prevHistory.some((item) => item.id === nextPost.id)) {
              return [nextPost, ...prevHistory];
            }
            return prevHistory;
          });

          return remainingQueue;
        } else {
          // B. ไม่มีรูปใหม่: เล่นรูปประวัติเก่าวนลูปไปเรื่อยๆ
          isDisplayingPriority.current = false;
          setHistoryLoop((prevHistory) => {
            if (prevHistory.length > 0) {
              if (historyIndex.current >= prevHistory.length) {
                historyIndex.current = 0; // ย้อนกลับมาตัวแรกสุดเมื่อครบลูป
              }
              setCurrent(prevHistory[historyIndex.current]);
              historyIndex.current += 1;
            }
            return prevHistory;
          });
          return prevQueue;
        }
      });
    };

    rotateSlide();
    const slideInterval = setInterval(rotateSlide, 8000); // สไลด์เปลี่ยนทุกๆ 8 วินาที
    return () => clearInterval(slideInterval);
  }, [historyLoop.length, trigger]);

  // แจ้งเตือนบอร์ดหลักว่าตอนนี้มีรูปภาพขึ้นจอบ้างหรือไม่
  useEffect(() => {
    if (onActivePostChange) {
      onActivePostChange(current !== null);
    }
  }, [current, onActivePostChange]);

  // ================= 4. GENERATE QR CODE AUTOMATICALLY =================
  useEffect(() => {
    if (!current?.ig_account) {
      setQr("");
      return;
    }

    const generateQR = async () => {
      try {
        const username = current.ig_account!.replace("@", "").trim();
        const url = await QRCode.toDataURL(`https://www.instagram.com/${username}`);
        setQr(url);
      } catch (err) {
        console.error("QR Generate error:", err);
      }
    };

    generateQR();
  }, [current]);

  // 🛠️ ปรับเปลี่ยนพาธและโดเมนรูปภาพให้ถูกต้องปลอดภัย 100%
  const normalizeImageUrl = (url: string | null | undefined) => {
    if (!url) return 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/DEK69.webp';
    
    // แปลง URL ตัวเก่าที่เป็น Private Storage ให้ใช้ Public CDN แทน
    if (url.startsWith('http://') || url.startsWith('https://')) {
        if (url.includes('894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69')) {
            return url.replace('https://894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69', 'https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev');
        }
        return url;
    }
    
    // กรณีเป็นพาธสั้นๆ ใน R2
    if (url.startsWith('Image69/') || url.startsWith('IG_Images/')) {
        return `https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/${url}`;
    }
    
    return url.startsWith('/') ? url : `/${url}`;
  };

  // ================= RENDER PREMIUM INTERFACE =================
  if (!current) return null; // 👈 หากไม่มีข้อมูลในคิว ให้ไม่แสดงอะไรเลย เพื่อปล่อยให้พื้นหลัง BK แสดงผลปกติ

  return (
    <div className="fixed inset-0 z-[99999] bg-black/40 backdrop-blur-md flex items-center justify-center p-6 md:p-12 overflow-hidden h-full w-full">
      {/* เอฟเฟกต์แสงไฟพื้นหลังแบบเกรเดียนท์ขยับเบาๆ */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-pink-600/10 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center max-w-7xl w-full h-full max-h-[85vh] z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* ================= ฝั่งซ้าย: รูปภาพนักศึกษา (6 Cols) ================= */}
          <div className="lg:col-span-7 flex justify-center items-center w-full h-full min-h-[300px] md:min-h-[500px]">
            <div className="relative w-full h-full max-h-[550px] aspect-[4/3] md:aspect-square lg:aspect-[4/4] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/10 group">
              <Image
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                quality={85}
                priority={true}
                src={normalizeImageUrl(current.image_url)}
                alt={current.name}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* ลายเส้นเงาสะท้อนระดับพรีเมียมด้านล่างภาพ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ================= ฝั่งขวา: QR Code & ข้อมูลการ์ด IG (5 Cols) ================= */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start justify-center w-full space-y-8">
            
            {/* การ์ดแก้วโปร่งใส (Glassmorphism) หุ้ม QR Code */}
            <div className="relative w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-3xl bg-white/10 backdrop-blur-md p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col items-center justify-center">
              {qr ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white p-4 shadow-inner">
                  <Image
                    fill
                    src={qr}
                    alt="Instagram QR Link"
                    className="object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3 text-white/40">
                  <svg className="w-12 h-12 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m0 11v3m8-7h-1m-11 0H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">กำลังเตรียม QR Code...</span>
                </div>
              )}
            </div>

            {/* ข้อมูลข้อความการ์ดผู้โพสต์ */}
            <div className="text-center lg:text-left w-full space-y-4 px-2">
              <div className="space-y-1">
                {/* คณะ / สาขา */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-pink-400 bg-pink-500/10 border border-pink-500/20">
                  {current.type || "นักศึกษา SPU"}
                </span>
                
                {/* ชื่อเล่น/ชื่อจริง */}
                <h2 className="text-white/70 text-lg font-medium tracking-wide">
                  {current.name || "Anonymous"}
                </h2>
              </div>

              {/* บัญชี IG */}
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-3xl md:text-5xl font-black tracking-tight drop-shadow-md break-all">
                {current.ig_account ? (
                  current.ig_account.startsWith("@") ? current.ig_account : `@${current.ig_account}`
                ) : (
                  "@no_account"
                )}
              </h1>

              {/* คำคม / ความในใจ */}
              {current.quote_text && (
                <p className="text-slate-300 text-base md:text-xl font-medium leading-relaxed italic max-w-md pt-2 border-t border-white/5">
                  “ {current.quote_text} ”
                </p>
              )}
            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}