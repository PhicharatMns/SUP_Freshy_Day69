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

  // 🛠️ ปรับเปลี่ยนพาธและโดเมนรูปภาพให้ถูกต้องปลอดภัย 100% (ป้องกันโดเมนซ้ำซ้อน)
  const normalizeImageUrl = (url: string | null | undefined) => {
    if (!url) return 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/DEK69.webp';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (url.includes('894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69')) {
        return url.replace('https://894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69', 'https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev');
      }
      return url;
    }
    if (url.startsWith('Image69/') || url.startsWith('IG_Images/')) {
      return `https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/${url}`;
    }
    return url.startsWith('/') ? url : `/${url}`;
  };
  const [qr, setQr] = useState("");
  
  // คิวสำหรับรูปใหม่ที่รอการแจ้งเตือน (Approve แล้ว)
  const [activeQueue, setActiveQueue] = useState<IGData[]>([]);
  // รายการประวัติรูปเก่าทั้งหมด (สำหรับวนลูปสไลด์โชว์เวลาไม่มีรูปใหม่)
  const [historyLoop, setHistoryLoop] = useState<IGData[]>([]);
  
  const shownIds = useRef<Set<number>>(new Set());
  const isDisplayingPriority = useRef<boolean>(false);

  const [trigger, setTrigger] = useState(0);
  const forceRotate = () => setTrigger((t) => t + 1);

  // ================= 1. POLL NEW POPUPS (คอยดึงรูปใหม่ที่เพิ่งแอดมินอนุมัติ) =================
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
    const popupInterval = setInterval(checkNewPopup, 3000);
    return () => {
      clearInterval(popupInterval);
    };
  }, []);

  // 🚨 REAL-TIME CHECK: ตรวจสอบสถานะการโดนลบราย ID เดี่ยวที่กำลังแสดงอยู่ ณ ขณะนั้น
  useEffect(() => {
    if (!current) return;

    const checkExists = async () => {
      try {
        const res = await fetch(`${post}/ig_my/check-exists/${current.id}?t=${Date.now()}`);
        const result = await res.json();
        if (result.success && result.exists === false) {
          // รูปนี้โดนลบไปจากระบบหลังบ้านแล้ว ➔ สั่งข้ามเปลี่ยนทันที
          setTimeout(forceRotate, 50);
          setCurrent(null);
        }
      } catch (err) {
        console.error("เช็คสถานะการมีอยู่ล้มเหลว:", err);
      }
    };

    const intervalId = setInterval(checkExists, 2000);
    return () => clearInterval(intervalId);
  }, [current]);

  // ================= 2. LOOP ROTATION (จัดการสลับสไลด์ทุกๆ 8 วินาที) =================
  useEffect(() => {
    const rotateSlide = () => {
      setActiveQueue((prevQueue) => {
        if (prevQueue.length > 0) {
          const nextPost = prevQueue[0];
          const remainingQueue = prevQueue.slice(1);

          isDisplayingPriority.current = true;
          setCurrent(nextPost);
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
  }, [trigger]);

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
                  src={normalizeImageUrl(current.image_url)}
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