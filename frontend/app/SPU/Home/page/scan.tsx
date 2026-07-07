"use client";

import QRCode from "qrcode";
import { post } from "@/app/Post";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { div } from "framer-motion/client";

interface IGData {
  id: number;
  name: string;
  ig_account?: string;
  image_url?: string;
  quote_text?: string;
  type: string
}

export default function Scan() {
  const [current, setCurrent] = useState<IGData | null>(null);
  const [show, setShow] = useState(false);
  const [qr, setQr] = useState("");

  const runningRef = useRef(false);

  // ================= FETCH POPUP =================
  const getPopup = async () => {
    if (runningRef.current) return;

    try {
      const res = await fetch(`${post}/ig_my/next-popup?t=${Date.now()}`);

      const result = await res.json();

      if (result.success && result.data) {
        runningRef.current = true;
        setCurrent(result.data);
        setShow(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPopup();

    const interval = setInterval(() => {
      if (!runningRef.current) {
        getPopup();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ================= AUTO CLOSE (ปรับเหลือ 6 วินาที) =================
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
      setCurrent(null);
      setQr("");
      runningRef.current = false;
    }, 5000); // 👈 แก้จาก 10000 เป็น 6000 (6 วินาที)

    return () => clearTimeout(timer);
  }, [show]);

  // ================= GENERATE QR =================
  useEffect(() => {
    if (!current?.ig_account) return;

    const generateQR = async () => {
      try {
        const username = (current.ig_account ?? "").replace("@", "");

        const url = await QRCode.toDataURL(
          `https://www.instagram.com/${username}`,
        );

        setQr(url);
      } catch (err) {
        console.error("QR error:", err);
      }
    };

    generateQR();
  }, [current]);

  console.log("POST URL =", post);

  // ================= RENDER =================
  return (
    // <AnimatePresence mode="wait">
    //   {show && current && (
    //     <motion.div
    //       key={current.id}
    //       className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{
    //         opacity: 0,
    //         backdropFilter: "blur(0px)",
    //       }}
    //       transition={{
    //         duration: 0.2,
    //         ease: "linear",
    //       }}
    //     >
    //       {/* Container หลักแบ่งเป็น 2 ฝั่ง ซ้าย-ขวา */}
    //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-6xl w-full max-h-screen p-4">

    //         {/* ================= ฝั่งซ้าย: รูปภาพหลัก ================= */}
    //         <div className="flex justify-center md:justify-end w-full">
    //           <motion.div
    //             className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10"
    //             initial={{ rotate: -1, scale: 0.98, opacity: 0 }}
    //             animate={{ rotate: 0, scale: 1, opacity: 1 }}
    //             exit={{ rotate: -1, scale: 0.98, opacity: 0 }}
    //             transition={{ duration: 0.25, ease: "easeOut" }}
    //           >
    //             <Image
    //               fill
    //               sizes="(max-width: 768px) 100vw, 450px"
    //               quality={75}
    //               priority={true}
    //               src={
    //                 current.image_url ||
    //                 "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/DEK69.webp"
    //               }
    //               alt={current.name}
    //               className="object-cover"
    //             />
    //           </motion.div>
    //         </div>

    //         {/* ================= ฝั่งขวา: QR Code + ข้อมูลด้านล่าง ================= */}
    //         <div className="flex flex-col items-center md:items-start w-full space-y-6">

    //           {/* QR CODE */}
    //           {qr && (current.ig_account ?? "").trim() !== "" && (
    //             <motion.div
    //               className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] lg:w-[450px] lg:h-[450px] rounded-2xl overflow-hidden bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center border border-white/10"
    //               initial={{ rotate: 1, opacity: 0, scale: 0.98 }}
    //               animate={{ rotate: 0, opacity: 1, scale: 1 }}
    //               exit={{ rotate: 1, opacity: 0, scale: 0.98 }}
    //               transition={{ duration: 0.25, ease: "easeOut" }}
    //             >
    //               <div className="relative w-full h-full">
    //                 <Image
    //                   fill
    //                   sizes="(max-width: 768px) 100vw, 450px"
    //                   src={qr}
    //                   alt="Instagram QR"
    //                   quality={75}
    //                   priority={true}
    //                   className="object-contain"
    //                 />
    //               </div>
    //             </motion.div>
    //           )}

    //           {/* รายละเอียดข้อความ (จะอยู่ใต้ QR Code เสมอ) */}
    //           <div className="text-center md:text-left w-full max-w-[380px] lg:max-w-[450px] space-y-3 px-2">
    //             {/* ชื่อบัญชี IG */}
    //             <motion.h1
    //               className="text-white text-3xl md:text-5xl lg:text-6xl font-black tracking-tight drop-shadow-md break-all"
    //               initial={{ opacity: 0, y: 10 }}
    //               animate={{ opacity: 1, y: 0 }}
    //               transition={{ duration: 0.2, delay: 0.05 }}
    //             >
    //               {current.ig_account || "No Account"}
    //             </motion.h1>

    //             {/* คำคม / แนะนำตัว */}
    //             {current.quote_text && (
    //               <motion.p
    //                 className="text-white/80 text-base md:text-lg font-medium leading-relaxed drop-shadow-sm"
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 transition={{ duration: 0.2, delay: 0.1 }}
    //               >
    //                 “ {current.quote_text} ”
    //               </motion.p>
    //             )}
    //           </div>

    //         </div>

    //       </div>
    //     </motion.div>
    //   )}
    // </AnimatePresence>
    <AnimatePresence mode="wait">
      {show && current && (
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

            {/* ================= รูปภาพ ================= */}
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
                      current.image_url ||
                      "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/DEK69.webp"
                    }
                    alt={current.name}
                    className="object-cover rounded-3xl"
                  />
                </motion.div>

              </div>
            </div>

            <div>
              <div className="flex flex-col items-center justify-center rounded-3xl overflow-hidden md:ml-6">

                {/* QR */}
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
                      className="object-contain p-10 w-fullw h-[600px]"
                    />
                  </motion.div>
                )}

                {/* Information */}
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
                    คณะ : {current.type}
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
      )}
    </AnimatePresence>
  );
}