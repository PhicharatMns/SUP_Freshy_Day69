"use client";

import { Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Myself from "./component/page/myself";
import IG from "./component/page/IG";
import { motion, AnimatePresence } from "framer-motion";
import { div } from "framer-motion/client";
import Qa from "./component/page/QA";

// Interface สำหรับข้อมูลฟองสบู่
interface Bubble {
  color: string;
  size: number;
  duration: number;
  left: number;
  delay: number;
  opacity: number;
}

export interface propspopup {
  myself: boolean;
  myopenpopypIG: boolean;
  myQa: boolean
}

export default function Formsup() {
  const [popup, setpoup] = useState({
    myself: false,
    myopenpopypIG: false,
    myQa: false
  });


  const [bubbles, setBubbles] = useState<Bubble[]>([]);


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

  useEffect(() => {
    const generatedBubbles = Array.from({ length: 30 }).map(() => ({
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      size: 13 + Math.random() * 27,
      duration: 4 + Math.random() * 9,
      left: Math.random() * 100,
      delay: Math.random() * 15,
      opacity: 0.85 + Math.random() * 0.15,
    }));
    setBubbles(generatedBubbles);
  }, []);


  // Animation Variants
  const textContainerVariants = {
    animate: { transition: { staggerChildren: 0.2 } },
  };
  const wordVariants: Variants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut" // ✨ ผ่านฉลุย ไม่เออเร่อแล้ว
      },
    },
  };

  const openpopupMyselt = () => setpoup(prev => ({
    ...prev,
    myself: true
  }))

  const openpopypIG = () => setpoup(prev => ({
    ...prev,
    myopenpopypIG: true
  }))

  const openpopupQa = () => setpoup(prve => ({
    ...prve,
    myQa: true
  }))

  const Social = [
    {
      title: 'แนะนำตัว',
      popup: openpopupMyselt,
      gradient: 'from-amber-400 via-pink-500 to-purple-600',
    },
    {
      title: 'IG ไอใจ',
      popup: openpopypIG,
      gradient: 'from-purple-600 via-rose-500 to-amber-500',
    },
    {
      title: 'ถาม-ตอบ',
      popup: openpopupQa,
      gradient: 'from-purple-600 via-rose-500 to-amber-500',
    },
    {
      title: 'PopCat',
      // popup: openpopupPopupCat,
      gradient: 'from-purple-600 via-rose-500 to-amber-500',
    }
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* 1. หน้าต่างคำเตือน (Warning Modal) */}
      {/* <AnimatePresence>
        {warning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-[20px] max-w-sm w-full shadow-2xl text-center"
            >
              <h2 className="text-xl font-bold text-red-500 mb-3">
                ⚠️ ข้อควรระวัง
              </h2>
              <p className="text-slate-600 mb-6 text-sm">
                ห้ามโพสต์รูปลามกอนาจาร คำหยาบคาย
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setWarning(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 font-medium hover:bg-slate-200 transition-all"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={confirmWarning}
                  className="flex-1 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all"
                >
                  เข้าใจแล้ว
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}

      {/* 2. พื้นหลังและเนื้อหาหลัก */}
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full z-50">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {bubbles.map((bubble, i) => {
            return (
              <div
                key={i}
                className={`absolute bottom-[-60px] rounded-full ${bubble.color} 
                                       shadow-[0_0_18px_#fff,0_0_32px_rgba(255,255,255,0.5),inset_8px_8px_12px_rgba(255,255,255,0.9)] 
                                       ring-1 ring-white/50
                                       animate-[floatBubble_linear_infinite]`}
                style={{
                  left: `${bubble.left}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                  animationDuration: `${bubble.duration}s`,
                  animationDelay: `-${bubble.delay}s`,
                  opacity: bubble.opacity,
                }}
              />
            );
          })}
        </div>

        <motion.div
          className="mb-8 text-3xl font-bold flex gap-2 drop-shadow-md"
          variants={textContainerVariants}
          animate="animate"
        >
          <motion.span variants={wordVariants} className="text-red-500">
            เลือก
          </motion.span>
          <motion.span variants={wordVariants} className="text-yellow-500">
            ที่ชอบ
          </motion.span>
          <motion.span variants={wordVariants} className="text-blue-500">
            เอาที่
          </motion.span>
          <motion.span variants={wordVariants} className="text-red-500">
            ใช่
          </motion.span>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-2xl p-4">
          {Social.map((e, i) => {
            return (
              <div
                onClick={e.popup}
                className={`w-full text-2xl h-40 z-50 hover:scale-105 flex items-center justify-center rounded-[20px] font-bold text-white shadow-lg bg-gradient-to-tr ${e.gradient} animate-gentle-bounce transition-all duration-300 cursor-pointer   `}
                key={i}
              >
                {e.title}
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {popup.myself && (
          <div className="z-[90] relative">
            <Myself setpoup={setpoup} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {popup.myopenpopypIG && (
          <div className="z-[90] relative">
            <IG
              setpoup={setpoup}
            />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {popup.myQa && (
          <div className="z-[90] relative">
            <Qa
              setpoup={setpoup}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
