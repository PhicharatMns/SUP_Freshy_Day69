"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { post } from "@/app/Post";
import { motion, AnimatePresence } from "framer-motion";

interface IGData {
  id: number;
  name: string;
  quote_text: string;
  image_url: string | null;
  ig_account: string;
  popup: boolean;
}

export default function Scan() {
  const [current, setCurrent] = useState<IGData | null>(null);
  const [show, setShow] = useState(false);
  const [qr, setQr] = useState("");

  const runningRef = useRef(false);

  useEffect(() => {
    const getPopup = async () => {
      // If a popup is already showing, skip the fetch
      if (runningRef.current) return;

      try {
        const res = await fetch(`${post}/ig_my/next-popup?t=${Date.now()}`);

        // Check if the response is actually JSON
        const contentType = res.headers.get("content-type");
        if (
          !res.ok ||
          !contentType ||
          !contentType.includes("application/json")
        ) {
          console.error(`API Error: Received status ${res.status}`);
          return;
        }

        const result = await res.json();

        if (result.success && result.data) {
          runningRef.current = true;
          setCurrent(result.data);
          setShow(true);
        }
      } catch (error) {
        console.error("Error fetching popup data:", error);
      }
    };

    // Initial fetch
    getPopup();

    // Polling every 15 seconds
    const interval = setInterval(getPopup, 15000);

    return () => clearInterval(interval);
  }, []);

  // Timer to close the popup after 10 seconds
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      setShow(false);
      setCurrent(null);
      setQr("");
      runningRef.current = false; // Allow the fetcher to run again
    }, 10000);

    return () => clearTimeout(timer);
  }, [show]);

  // Generate QR code when current data updates
  useEffect(() => {
    if (!current?.ig_account) return;

    const generateQR = async () => {
      try {
        const username = current.ig_account.replace("@", "");
        const url = await QRCode.toDataURL(
          `https://www.instagram.com/${username}`,
        );
        setQr(url);
      } catch (error) {
        console.error("QR Generation failed:", error);
      }
    };

    generateQR();
  }, [current]);

  if (!show || !current) return null;

  const hasIG = current.ig_account && current.ig_account.trim() !== "";

  return (
    <div className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-xl animate-fade-in overflow-y-auto">
      {/* ส่วนจัดตำแหน่งให้อยู่กลางจอ และเผื่อ Scroll ถ้าจอแนวตั้งสั้นเกินไป */}
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-5xl w-full flex flex-col items-center gap-6 sm:gap-8 py-8 sm:py-0">
          {/* ─── Grid Cards Container ─── */}
          {/* บนมือถือ/แนวตั้ง จะบีบขนาดกล่องด้วย max-w-[280px] เพื่อไม่ให้รูปใหญ่เกินไปจนล้นจอ */}
          <div
            className={`grid gap-4 sm:gap-8 w-full ${
              hasIG
                ? "md:grid-cols-2 grid-cols-1 max-w-[280px] sm:max-w-md md:max-w-4xl mx-auto"
                : "grid-cols-1 max-w-[280px] sm:max-w-md mx-auto"
            }`}
          >
            {/* User Profile Image Card */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-900 group mx-auto">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                src={
                  current.image_url ||
                  "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/spuprofile.jpg"
                }
                alt={current.name}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={true}
              />
              {/* Gradient เงานุ่มๆ ด้านล่างภาพ */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* QR Code Card */}
            {qr && hasIG && (
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden    flex flex-col items-center justify-center gap-3 sm:gap-4 mx-auto">
                <div className="relative w-full h-full max-w-[75%] max-h-[75%] sm:max-w-[85%] sm:max-h-[85%]">
                  <Image
                    fill
                    src={qr}
                    alt="Instagram QR"
                    className="object-contain"
                  />
                </div>
                {/* Instagram Username Badge สีสดใส */}
                <span className="px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-xs sm:text-sm font-semibold shadow-md tracking-wide animate-pulse truncate max-w-full">
                  {current.ig_account.startsWith("@")
                    ? current.ig_account
                    : `@${current.ig_account}`}
                </span>
              </div>
            )}
          </div>

          {/* ─── User Info Section ─── */}
          {/* ─── User Info Section ─── */}
          <div className="text-center max-w-2xl px-2 mt-2">
            {/* ชื่อผู้ใช้ไล่เฉดสีขาว-เงิน มีเงา Drop Shadow */}
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-300">
              {current.name || "เด็กศรีปทุมท่านหนึ่ง"}
            </h1>

            {current.quote_text && (
              <div className="relative mt-5 sm:mt-6 px-2">
                <div className="relative rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/10 shadow-xl px-6 py-6 sm:px-10 sm:py-8">
                  {/* เครื่องหมายคำพูดใหญ่ สีเด่นแบบ gradient */}
                  <span className="absolute -top-5 left-4 sm:-top-7 sm:left-6 text-6xl sm:text-8xl font-serif select-none bg-gradient-to-b from-purple-400 to-pink-500 bg-clip-text text-transparent opacity-90 drop-shadow-lg">
                    "
                  </span>

                  <p className="relative text-white text-xl sm:text-2xl md:text-3xl italic font-bold leading-snug drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] tracking-wide">
                    {current.quote_text}
                  </p>

                  <span className="absolute -bottom-10 right-4 sm:-bottom-14 sm:right-6 text-6xl sm:text-8xl font-serif select-none bg-gradient-to-b from-purple-400 to-pink-500 bg-clip-text text-transparent opacity-90 drop-shadow-lg">
                    "
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
