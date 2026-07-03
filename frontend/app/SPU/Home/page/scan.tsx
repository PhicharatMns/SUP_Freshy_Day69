'use client'

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
                if (!res.ok || !contentType || !contentType.includes("application/json")) {
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
                    `https://www.instagram.com/${username}`
                );
                setQr(url);
            } catch (error) {
                console.error("QR Generation failed:", error);
            }
        };

        generateQR();
    }, [current]);

    if (!show || !current) return null;

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
                            className={`grid gap-10 ${current.ig_account?.trim()
                                    ? "grid-cols-2"
                                    : "grid-cols-1"
                                }`}
                            initial={{
                                scale: 0.7,
                                opacity: 0,
                                y: 100,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}
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
                            {/* รูปหลัก */}
                            <motion.div
                                className="relative w-[560px] h-[560px] rounded-[20px] overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                                initial={{
                                    rotate: -8,
                                    scale: 0.9,
                                }}
                                animate={{
                                    rotate: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    rotate: -4,
                                    scale: 0.95,
                                }}
                                transition={{
                                    delay: 0.1,
                                    type: "spring",
                                    stiffness: 150,
                                }}
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
                            {qr && current.ig_account.trim() !== "" && (
                                <motion.div
                                    className="relative w-[560px] h-[560px] rounded-[20px] overflow-hidden bg-white p-5 shadow-[0_0_60px_rgba(255,255,255,0.15)]"
                                    initial={{
                                        rotate: 8,
                                        opacity: 0,
                                        scale: 0.8,
                                    }}
                                    animate={{
                                        rotate: 0,
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    exit={{
                                        rotate: 4,
                                        opacity: 0,
                                        scale: 0.95,
                                    }}
                                    transition={{
                                        delay: 0.2,
                                        type: "spring",
                                        stiffness: 150,
                                    }}
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
                            initial={{
                                opacity: 0,
                                y: 30,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: 15,
                            }}
                            transition={{
                                delay: 0.3,
                                duration: 0.4,
                            }}
                        >
                            {current.name || "เด็กศรีปทุมท่านหนึ่ง"}
                        </motion.h1>

                        <motion.p
                            className="text-white/90 text-center mt-4 max-w-2xl text-xl leading-relaxed"
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            transition={{
                                delay: 0.5,
                                duration: 0.4,
                            }}
                        >
                            {current.quote_text}
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}