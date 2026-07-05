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
}

export default function Scan() {
  const [current, setCurrent] = useState<IGData | null>(null);
  const [show, setShow] = useState(false);
  const [qr, setQr] = useState("");

  const runningRef = useRef(false);

  // ================= FETCH POPUP =================
  useEffect(() => {
    const getPopup = async () => {
      if (runningRef.current) return;

      try {
        const res = await fetch(
          `${post}/ig_my/next-popup?t=${Date.now()}`
        );

        const contentType = res.headers.get("content-type");

        if (
          !res.ok ||
          !contentType ||
          !contentType.includes("application/json")
        ) {
          console.error("API Error:", res.status);
          return;
        }

        const result = await res.json();

        if (result.success && result.data) {
          runningRef.current = true;
          setCurrent(result.data);
          setShow(true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    getPopup();
    const interval = setInterval(getPopup, 15000);

    return () => clearInterval(interval);
  }, []);

  // ================= AUTO CLOSE =================
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
      setCurrent(null);
      setQr("");
      runningRef.current = false;
    }, 10000);

    return () => clearTimeout(timer);
  }, [show]);

  // ================= GENERATE QR =================
  useEffect(() => {
    if (!current?.ig_account) return;

    const generateQR = async () => {
      try {
        const username = (current.ig_account ?? "").replace("@", "");

        const url = await QRCode.toDataURL(
          `https://www.instagram.com/${username}`
        );

        setQr(url);
      } catch (err) {
        console.error("QR error:", err);
      }
    };

    generateQR();
  }, [current]);

  // ================= RENDER =================
  return (
    <AnimatePresence mode="wait">
      {show && current && (
        <motion.div
          key={current.id}
          className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              className={`grid gap-10 ${(current.ig_account ?? "").trim()
                  ? "grid-cols-2"
                  : "grid-cols-1"
                }`}
              initial={{ scale: 0.7, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{
                scale: 0.85,
                opacity: 0,
                y: 40,
                filter: "blur(12px)",
              }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18,
              }}
            >
              {/* IMAGE */}
              <motion.div
                className="relative w-[560px] h-[560px] rounded-[20px] overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                initial={{ rotate: -8, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: -4, scale: 0.95 }}
              >
                <Image
                  fill
                  sizes="560px"
                  quality={70}
                  src={
                    current.image_url ||
                    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/spuprofile.jpg"
                  }
                  alt={current.name}
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* QR */}
              {qr && (current.ig_account ?? "").trim() !== "" && (
                <motion.div
                  className="relative w-[560px] h-[560px] rounded-[20px] overflow-hidden bg-white p-5 shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                  initial={{ rotate: 8, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 4, opacity: 0, scale: 0.95 }}
                >
                  <Image
                    fill
                    sizes="560px"
                    src={qr}
                    alt="Instagram QR"
                    className="object-contain"
                  />
                </motion.div>
              )}
            </motion.div>

            <motion.h1
              className="text-white text-4xl font-black mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {current.name || "เด็ก Freshy69"}
            </motion.h1>

            <motion.p
              className="text-white/90 text-center mt-4 max-w-2xl text-xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {current.quote_text}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}