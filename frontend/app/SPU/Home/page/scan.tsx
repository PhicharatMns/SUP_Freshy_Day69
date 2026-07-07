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
          if (!p.created_at) return true;
          // แปลงช่องว่างระหว่างวันที่และเวลาเป็น T เพื่อให้อ่านวันที่ใน JS ได้อย่างเสถียร
          const timeStr = p.created_at.replace(" ", "T");
          const parsedTime = new Date(timeStr).getTime();
          if (isNaN(parsedTime)) return true; // หากแยกแยะเวลาไม่ได้ ปล่อยผ่านทันที
          
          return Date.now() - parsedTime >= 5000;
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
    const popupInterval = setInterval(checkNewPopup, 3000);
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
          const nextPost = prevQueue[0];
          const remainingQueue = prevQueue.slice(1);

          isDisplayingPriority.current = true;
          setCurrent(nextPost);

          setHistoryLoop((prevHistory) => {
            if (!prevHistory.some((item) => item.id === nextPost.id)) {
              return [nextPost, ...prevHistory];
            }
            return prevHistory;
          });

          return remainingQueue;
        } else {
          // 🚨 ไม่ต้องเล่นรูปเก่าวนซ้ำ: เมื่อไม่มีโพสต์ใหม่ในคิว ให้สลับกลับหน้า QR Code ทันที
          isDisplayingPriority.current = false;
          setCurrent(null);
          return prevQueue;
        }
      });
    };

    rotateSlide();
    const slideInterval = setInterval(rotateSlide, 8000);
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

  // ================= RENDER (เลย์เอาต์ขนาดใหญ่พิเศษของกิ่ง LIF) =================
  if (!current) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current.id}
        className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          backdropFilter: "blur(0px)",
        }}
        transition={{
          duration: 0.2,
          ease: "linear",
        }}
      >
        <div className="grid grid-cols-2">

          {/* ================= ฝั่งซ้าย: รูปภาพนักศึกษาขนาดใหญ่ 700px ================= */}
          <div className="w-full h-full">
            <div className="flex justify-center md:justify-end relative w-full h-full">
              <motion.div
                className="relative w-[700px] h-[700px] shrink-0 rounded-3xl overflow-hidden"
                initial={{ rotate: -1, scale: 0.98, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -1, scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Image
                  fill
                  priority
                  quality={80}
                  src={
                    current.image_url
                      ? (current.image_url.startsWith("http")
                          ? current.image_url
                          : `https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/${current.image_url}`)
                      : "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/DEK69.webp"
                  }
                  alt={current.name}
                  className="object-cover rounded-3xl"
                />
              </motion.div>
            </div>
          </div>

          {/* ================= ฝั่งขวา: QR Code & ข้อความคำคม ================= */}
          <div>
            <div className="flex flex-col items-center justify-center rounded-3xl overflow-hidden md:ml-6">
              
              {/* กรอบ QR Code ขนาดใหญ่ยักษ์ 800px x 600px */}
              {qr && (
                <motion.div
                  className="relative w-[800px] h-[600px] bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 shadow-inner mb-8"
                  initial={{ rotate: 1, scale: 0.98, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 1, scale: 0.98, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Image
                    fill
                    priority
                    quality={80}
                    src={qr}
                    alt="QR"
                    className="object-contain p-10 w-full h-[600px]"
                  />
                </motion.div>
              )}

              {/* ข้อมูลข้อความนักศึกษา */}
              <div className="w-full text-center">
                <motion.span
                  className="text-[60px] font-bold text-white uppercase tracking-wider block mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  IG : {current.ig_account}
                </motion.span>

                <motion.span
                  className="text-4xl font-medium text-white uppercase tracking-wider block mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.08 }}
                >
                  คณะ : {current.type || "นักศึกษา SPU"}
                </motion.span>

                {current.quote_text && (
                  <motion.span
                    className="text-4xl font-medium text-white uppercase tracking-wider block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.12 }}
                  >
                    "{current.quote_text}"
                  </motion.span>
                )}
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}