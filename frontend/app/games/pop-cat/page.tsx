//  "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { post } from "@/app/Post";
// import Link from "next/link";

// interface Bubble {
//   color: string;
//   size: number;
//   duration: number;
//   left: number;
//   delay: number;
//   opacity: number;
// }

// const DEPARTMENTS_CONFIG: Record<
//   string,
//   {
//     name: string;
//     nameEn: string;
//     abbr: string;
//     theme: {
//       accent: string; // คลาส Tailwind สีตัวเลขคะแนน/ชื่อคณะ
//       accentHex: string; // ค่าสีเดียวกัน แบบ hex ไว้ใช้กับ inline style / SVG
//       badgeBg: string; // พื้นหลังป้ายตัวย่อ
//       badgeText: string; // สีตัวอักษรป้ายตัวย่อ
//       border: string; // สีเส้นขอบป้าย
//       glow: string; // แสงเรืองรอบปุ่มกด (เอฟเฟกต์เล็กๆ ไม่ใช่พื้นหลังทั้งหน้า)
//     };
//     catImages: {
//       closed: string;
//       open: string;
//     };
//   }
// > = {
//   "digital-media": {
//     name: "คณะดิจิทัลมีเดีย",
//     nameEn: "School of Digital Media",
//     abbr: "SDM",
//     theme: {
//       accent: "text-[#B5D334]",
//       accentHex: "#B5D334",
//       badgeBg: "bg-[#B5D334]/15",
//       badgeText: "text-[#B5D334]",
//       border: "border-[#B5D334]/40",
//       glow: "bg-[#B5D334]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/digi01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/digi02.webp",
//     },
//   },
//   "information-technology": {
//     name: "คณะเทคโนโลยีสารสนเทศ",
//     nameEn: "School of Information Technology",
//     abbr: "SIT",
//     theme: {
//       accent: "text-[#91268f]",
//       accentHex: "#91268f",
//       badgeBg: "bg-[#91268f]/15",
//       badgeText: "text-[#91268f]",
//       border: "border-[#91268f]/40",
//       glow: "bg-[#91268f]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/IT001.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/IT002.webp",
//     },
//   },
//   "communication-arts": {
//     name: "คณะนิเทศศาสตร์",
//     nameEn: "School of Communication Arts",
//     abbr: "CA",
//     theme: {
//       accent: "text-[#ffdd00]",
//       accentHex: "#ffdd00",
//       badgeBg: "bg-[#ffdd00]/15",
//       badgeText: "text-[#ffdd00]",
//       border: "border-[#ffdd00]/40",
//       glow: "bg-[#ffdd00]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/Ni_TED01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/Ni_TED02.webp",
//     },
//   },
//   engineering: {
//     name: "คณะวิศวกรรมศาสตร์",
//     nameEn: "School of Engineering",
//     abbr: "EN",
//     theme: {
//       accent: "text-[#981f22]",
//       accentHex: "#981f22",
//       badgeBg: "bg-[#981f22]/15",
//       badgeText: "text-[#981f22]",
//       border: "border-[#981f22]/40",
//       glow: "bg-[#981f22]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/widwa01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/widwa02.webp",
//     },
//   },
//   "architecture-design": {
//     name: "คณะการออกแบบและสถาปัตยกรรมศาสตร์",
//     nameEn: "School of Architecture and Design",
//     abbr: "SOA",
//     theme: {
//       accent: "text-[#801418]",
//       accentHex: "#801418",
//       badgeBg: "bg-[#801418]/15",
//       badgeText: "text-[#801418]",
//       border: "border-[#801418]/40",
//       glow: "bg-[#801418]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/satapudV2_01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/satapudV2_02.webp",
//     },
//   },
//   "business-administration": {
//     name: "คณะบริหารธุรกิจ",
//     nameEn: "School of Business Administration",
//     abbr: "SBS",
//     theme: {
//       accent: "text-[#0B99DF]",
//       accentHex: "#0B99DF",
//       badgeBg: "bg-[#0B99DF]/15",
//       badgeText: "text-[#0B99DF]",
//       border: "border-[#0B99DF]/40",
//       glow: "bg-[#0B99DF]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/borrihanV2_01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/borrihanV2_02.webp",
//     },
//   },
//   accountancy: {
//     name: "คณะบัญชี",
//     nameEn: "School of Accountancy",
//     abbr: "ACC",
//     theme: {
//       accent: "text-[#00A651]",
//       accentHex: "#00A651",
//       badgeBg: "bg-[#00A651]/15",
//       badgeText: "text-[#00A651]",
//       border: "border-[#00A651]/40",
//       glow: "bg-[#00A651]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/32.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/33.webp",
//     },
//   },

//   law: {
//     name: "คณะนิติศาสตร์",
//     nameEn: "School of Law",
//     abbr: "LAW",
//     theme: {
//       accent: "text-[#EC008C]",
//       accentHex: "#EC008C",
//       badgeBg: "bg-[#EC008C]/15",
//       badgeText: "text-[#EC008C]",
//       border: "border-[#EC008C]/40",
//       glow: "bg-[#EC008C]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/niti01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/niti02.webp",
//     },
//   },

//   "liberal-arts": {
//     name: "คณะศิลปศาสตร์",
//     nameEn: "School of Liberal Arts",
//     abbr: "LA",
//     theme: {
//       accent: "text-[#F5821F]",
//       accentHex: "#F5821F",
//       badgeBg: "bg-[#F5821F]/15",
//       badgeText: "text-[#F5821F]",
//       border: "border-[#F5821F]/40",
//       glow: "bg-[#F5821F]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/sin_lapa01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/sin_lapa02.webp",
//     },
//   },

//   "aviation-transportation": {
//     name: "วิทยาลัยการบินการท่องเที่ยวและการบริการ",
//     nameEn: "College of Aviation and Transportation",
//     abbr: "CAT",
//     theme: {
//       accent: "text-[#D81B60]",
//       accentHex: "#D81B60",
//       badgeBg: "bg-[#D81B60]/15",
//       badgeText: "text-[#D81B60]",
//       border: "border-[#D81B60]/40",
//       glow: "bg-[#D81B60]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_bin01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_bin02.webp",
//     },
//   },

//   "international-college": {
//     name: "วิทยาลัยนานาชาติ",
//     nameEn: "Sripatum International College",
//     abbr: "SPIC",
//     theme: {
//       accent: "text-[#A7B6BE]",
//       accentHex: "#A7B6BE",
//       badgeBg: "bg-[#A7B6BE]/15",
//       badgeText: "text-[#A7B6BE]",
//       border: "border-[#A7B6BE]/40",
//       glow: "bg-[#A7B6BE]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/nana01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/nana02.webp",
//     },
//   },
//   entrepreneurship: {
//     name: "คณะการสร้างเจ้าของธุรกิจและการบริหารจัดการ",
//     nameEn: "School of Entrepreneurship and Management",
//     abbr: "SE",
//     theme: {
//       accent: "text-[#F92D20]",
//       accentHex: "#F92D20",
//       badgeBg: "bg-[#F92D20]/15",
//       badgeText: "text-[#F92D20]",
//       border: "border-[#F92D20]/40",
//       glow: "bg-[#F92D20]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_sang01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_sang02.webp",
//     },
//   },
//   logistic: {
//     name: "วิทยาลัยโลจิสติกส์และซัพพลายเชน",
//     nameEn: "School of Logistics and Supply Chain Management",
//     abbr: "SLSCM",
//     theme: {
//       accent: "text-[#00A0E3]",
//       accentHex: "#00A0E3",
//       badgeBg: "bg-[#00A0E3]/15",
//       badgeText: "text-[#00A0E3]",
//       border: "border-[#00A0E3]/40",
//       glow: "bg-[#00A0E3]",
//     },
//     catImages: {
//       closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/logisV2_01.webp",
//       open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/logisV2_02.webp",
//     },
//   },
// };


// // สี "ตายตัว" ของธีมโปสเตอร์ (ไม่ขึ้นกับคณะ)
// const INK = "#201A14"; // เส้นขอบ/ตัวหนังสือหลัก (เกือบดำ)
// const PAPER = "#F4EAD4"; // พื้นหลังกระดาษครีม
// const PAPER_LIGHT = "#FBF5E7"; // พื้นการ์ดสีอ่อนกว่า
// const RED = "#E8362A";
// const BLUE = "#1F4FA0";
// const YELLOW = "#F6C51A";

// export default function PopCatGamePage() {
//   const [selectedDeptId, setSelectedDeptId] =
//     useState<string>("digital-media");

//   const [deptScores, setDeptScores] =
//     useState<Record<string, number>>({});

//   const [isMouthOpen, setIsMouthOpen] =
//     useState(false);

//   const [isBouncing, setIsBouncing] =
//     useState(false);

//   const [burstKey, setBurstKey] = useState(0);

//   const [isDropdownOpen, setIsDropdownOpen] =
//     useState(false);

//   const dropdownRef =
//     useRef<HTMLDivElement>(null);

//   /* =========================
//      pending click buffer
//   ========================= */
//   const pendingClicks = useRef<Record<string, number>>({});
//   const isFlushing = useRef(false);

//   /* =========================
//      current score (safe number)
//   ========================= */
//   const currentScore =
//     Number(deptScores[selectedDeptId] ?? 0);

//   /* =========================
//      dropdown outside click
//   ========================= */
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target as Node)
//       ) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   /* =========================
//      load scores
//   ========================= */
//   useEffect(() => {
//     const loadScores = async () => {
//       try {
//         const res = await fetch(`${post}/popcar/scores`);
//         const json = await res.json();

//         if (!json.status) return;

//         const scores: Record<string, number> = {};

//         json.data.forEach((item: any) => {
//           scores[item.department_key] =
//             Number(item.total_clicks);
//         });

//         setDeptScores(scores);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     loadScores();
//   }, []);

//   /* =========================
//      click handler (NO API CALL)
//   ========================= */
//   const handlePress = () => {
//     setIsMouthOpen(true);
//     setIsBouncing(true);
//     setBurstKey((k) => k + 1);

//     // UI update instantly
//     setDeptScores((prev) => ({
//       ...prev,
//       [selectedDeptId]:
//         Number(prev[selectedDeptId] ?? 0) + 1,
//     }));

//     // buffer click
//     pendingClicks.current[selectedDeptId] =
//       (pendingClicks.current[selectedDeptId] || 0) + 1;

//     setTimeout(() => {
//       setIsBouncing(false);
//     }, 90);
//   };

//   const handleRelease = () => {
//     setIsMouthOpen(false);
//   };

//   /* =========================
//      flush to server (bulk)
//   ========================= */
//   const flushClicks = async () => {
//     if (isFlushing.current) return;

//     const entries = Object.entries(pendingClicks.current);

//     if (entries.length === 0) return;

//     isFlushing.current = true;

//     try {
//       for (const [departmentKey, count] of entries) {
//         await fetch(`${post}/popcar/click-bulk`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             departmentKey,
//             count,
//           }),
//         });
//       }

//       pendingClicks.current = {};
//     } catch (err) {
//       console.error(err);
//     } finally {
//       isFlushing.current = false;
//     }
//   };

//   /* =========================
//      flush every 30 seconds
//   ========================= */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       flushClicks();
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   const currentDept =
//     DEPARTMENTS_CONFIG[selectedDeptId] ??
//     DEPARTMENTS_CONFIG["digital-media"];

//   /* =========================
//      send last data before close
//   ========================= */
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       const data = JSON.stringify(pendingClicks.current);

//       navigator.sendBeacon(
//         `${post}/popcar/click-bulk`,
//         data
//       );
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   const departmentsKeys =
//     Object.keys(DEPARTMENTS_CONFIG);

//   // ฟองสบู่
//   const bubbleColors = [
//     "bg-white",
//     "bg-sky-300",
//     "bg-purple-300",
//     "bg-pink-300",
//     "bg-emerald-300",
//     "bg-violet-300",
//     "bg-rose-300",
//     "bg-cyan-300",
//   ];

//   const [bubbles, setBubbles] = useState<Bubble[]>([]);

//   useEffect(() => {
//     const generatedBubbles = Array.from({ length: 30 }).map(() => ({
//       color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
//       size: 13 + Math.random() * 27,
//       duration: 4 + Math.random() * 9,
//       left: Math.random() * 100,
//       delay: Math.random() * 15,
//       opacity: 0.85 + Math.random() * 0.15,
//     }));
//     setBubbles(generatedBubbles);
//   }, []);


//   return (
//     <main
//       className="relative min-h-screen w-full flex flex-col overflow-hidden font-body"
//       style={{ backgroundColor: PAPER, color: INK }}
//     >
//       {/* ===================================================================
//           ฟอนต์การ์ตูน: Titan One (หัวข้อ/ตัวเลข ทรงบับเบิ้ลหนา) + Baloo 2 (ตัวอักษรทั่วไป)
//           ถ้าต้องการประสิทธิภาพดีขึ้น แนะนำย้ายไปโหลดผ่าน next/font ใน layout.tsx แทน
//           =================================================================== */}
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Titan+One&family=Baloo+2:wght@400;500;600;700;800&display=swap");
//         @keyframes dropdown-slide {
//           from { opacity: 0; transform: translateY(8px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0)   scale(1);    }
//         }
//         .dropdown-slide {
//           animation: dropdown-slide 0.18s ease-out forwards;
//         }
//         .font-display {
//           font-family: "Titan One", system-ui, sans-serif;
//         }
//         .font-body {
//           font-family: "Baloo 2", system-ui, sans-serif;
//         }
//         .comic-outline {
//           -webkit-text-stroke: 2.5px ${INK};
//           paint-order: stroke fill;
//         }
//         @keyframes comic-pop {
//           0% {
//             opacity: 0;
//             transform: translate(-50%, 0%) scale(0.5) rotate(-8deg);
//           }
//           35% {
//             opacity: 1;
//             transform: translate(-50%, -70%) scale(1.15) rotate(4deg);
//           }
//           100% {
//             opacity: 0;
//             transform: translate(-50%, -130%) scale(0.9) rotate(-3deg);
//           }
//         }
//         .comic-pop {
//           animation: comic-pop 0.55s ease-out forwards;
//         }
//         @keyframes ray-burst {
//           0% {
//             opacity: 0.9;
//             transform: scale(0.4) rotate(0deg);
//           }
//           100% {
//             opacity: 0;
//             transform: scale(1.6) rotate(14deg);
//           }
//         }
//         .ray-burst {
//           animation: ray-burst 0.5s ease-out forwards;
//         }
//         @keyframes float-slow {
//           0%,
//           100% {
//             transform: translateY(0) rotate(var(--r, 0deg));
//           }
//           50% {
//             transform: translateY(-8px) rotate(var(--r, 0deg));
//           }
//         }
//         .float-slow {
//           animation: float-slow 6s ease-in-out infinite;
//         }
//         @keyframes spin-slow {
//           to {
//             transform: rotate(360deg);
//           }
//         }
//         .spin-slow {
//           animation: spin-slow 20s linear infinite;
//         }
//       `}</style>

//       <div className="p-4 flex gap-3 items-center z-[999]">
//         <button
//           onClick={() => window.history.back()}
//           className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-all duration-200"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//           </svg>
//           ย้อนกลับ
//         </button>
//       </div>

//       {/* พื้นผิวฮาล์ฟโทน (จุดจางๆ) ให้ความรู้สึกงานพิมพ์การ์ตูน */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-70"
//         style={{
//           backgroundImage: `radial-gradient(circle, rgba(32,26,20,0.07) 1px, transparent 1.6px)`,
//           backgroundSize: "16px 16px",
//         }}
//       />

//       {bubbles.map((bubble, i) => {
//         return (
//           <div
//             key={i}
//             className={`absolute bottom-[-60px] rounded-full ${bubble.color} 
//                                              shadow-[0_0_18px_#fff,0_0_32px_rgba(255,255,255,0.5),inset_8px_8px_12px_rgba(255,255,255,0.9)] 
//                                              ring-1 ring-white/50
//                                              animate-[floatBubble_linear_infinite]`}
//             style={{
//               left: `${bubble.left}%`,
//               width: `${bubble.size}px`,
//               height: `${bubble.size}px`,
//               animationDuration: `${bubble.duration}s`,
//               animationDelay: `-${bubble.delay}s`,
//               opacity: bubble.opacity,
//             }}
//           />
//         );
//       })}

//       {/* ===================== ของตกแต่งมุมจอ (คงที่ ไม่ผูกกับคณะ) ===================== */}

//       {/* ลายตารางหมากรุก มุมขวาบน */}
//       <div
//         className="absolute -top-8 -right-10 w-32 h-32 sm:w-44 sm:h-44 rotate-12 opacity-90 pointer-events-none rounded-2xl"
//         style={{
//           backgroundImage: `
//             linear-gradient(45deg, ${INK} 25%, transparent 25%),
//             linear-gradient(-45deg, ${INK} 25%, transparent 25%),
//             linear-gradient(45deg, transparent 75%, ${INK} 75%),
//             linear-gradient(-45deg, transparent 75%, ${INK} 75%)`,
//           backgroundSize: "18px 18px",
//           backgroundPosition: "0 0, 0 9px, 9px -9px, -9px 0px",
//           maskImage:
//             "radial-gradient(circle at 30% 70%, black 55%, transparent 90%)",
//           WebkitMaskImage:
//             "radial-gradient(circle at 30% 70%, black 55%, transparent 90%)",
//         }}
//       />

//       {/* ลายตารางหมากรุก มุมขวาล่าง */}
//       <div
//         className="absolute -bottom-10 -right-8 w-28 h-28 sm:w-36 sm:h-36 -rotate-6 opacity-80 pointer-events-none hidden sm:block"
//         style={{
//           backgroundImage: `
//             linear-gradient(45deg, ${INK} 25%, transparent 25%),
//             linear-gradient(-45deg, ${INK} 25%, transparent 25%),
//             linear-gradient(45deg, transparent 75%, ${INK} 75%),
//             linear-gradient(-45deg, transparent 75%, ${INK} 75%)`,
//           backgroundSize: "16px 16px",
//           backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
//           maskImage:
//             "radial-gradient(circle at 70% 30%, black 55%, transparent 90%)",
//           WebkitMaskImage:
//             "radial-gradient(circle at 70% 30%, black 55%, transparent 90%)",
//         }}
//       />

//       {/* ดาวกระจายสีแดง มุมซ้ายบน */}
//       <svg
//         className="float-slow absolute top-6 left-3 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none"
//         style={{ color: RED, filter: `drop-shadow(2px 2px 0 ${INK})`, ["--r" as string]: "-8deg" }}
//         viewBox="0 0 100 100"
//         fill="currentColor"
//       >
//         <path d="M50 2 L61 36 L97 36 L68 57 L79 91 L50 70 L21 91 L32 57 L3 36 L39 36 Z" />
//       </svg>

//       {/* หน้ายิ้มในวงกลมเหลือง มุมขวาบน (ใกล้ตาราง) */}
//       <div
//         className="float-slow absolute top-5 right-8 sm:right-12 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center pointer-events-none"
//         style={{ backgroundColor: YELLOW, border: `3px solid ${INK}`, ["--r" as string]: "6deg" }}
//       >
//         <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={INK} strokeWidth="2">
//           <circle cx="9" cy="10" r="1.1" fill={INK} stroke="none" />
//           <circle cx="15" cy="10" r="1.1" fill={INK} stroke="none" />
//           <path d="M8 15c1.2 1.4 2.7 2 4 2s2.8-.6 4-2" strokeLinecap="round" />
//         </svg>
//       </div>

//       {/* ก้อนสีน้ำเงินทรงอิสระ มุมซ้ายล่าง */}
//       <div
//         className="absolute -bottom-12 -left-12 w-40 h-40 sm:w-56 sm:h-56 opacity-85 pointer-events-none"
//         style={{
//           backgroundColor: BLUE,
//           borderRadius: "58% 42% 63% 37% / 41% 55% 45% 59%",
//         }}
//       />

//       {/* ดอกไม้เล็กๆ บนก้อนสีน้ำเงิน */}
//       <svg
//         className="float-slow absolute bottom-10 left-6 sm:left-10 w-9 h-9 sm:w-11 sm:h-11 pointer-events-none"
//         style={{ color: YELLOW, ["--r" as string]: "10deg" }}
//         viewBox="0 0 40 40"
//         fill="currentColor"
//       >
//         <circle cx="20" cy="10" r="7" />
//         <circle cx="20" cy="30" r="7" />
//         <circle cx="10" cy="20" r="7" />
//         <circle cx="30" cy="20" r="7" />
//         <circle cx="20" cy="20" r="6" fill={INK} />
//       </svg>

//       {/* ลูกโลกโครงลวด หมุนช้าๆ ฝั่งซ้าย (โชว์เฉพาะจอที่กว้างพอ) */}
//       <svg
//         className="spin-slow absolute top-1/3 -left-7 w-16 h-16 opacity-25 pointer-events-none hidden sm:block"
//         viewBox="0 0 60 60"
//         fill="none"
//         stroke={INK}
//         strokeWidth="1"
//       >
//         <circle cx="30" cy="30" r="26" />
//         <ellipse cx="30" cy="30" rx="26" ry="10" />
//         <ellipse cx="30" cy="30" rx="10" ry="26" />
//         <line x1="4" y1="30" x2="56" y2="30" />
//       </svg>

//       {/* ===================== เนื้อหาหลัก ===================== */}
//       <div className="flex-1 flex flex-col items-center justify-between px-5 pt-14 pb-10 relative z-10 w-full max-w-md sm:max-w-lg mx-auto">
//         {/* หัวเรื่อง */}
//         <div className="text-center space-y-3 mt-2">
//           <span
//             className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider -rotate-2"
//             style={{
//               backgroundColor: INK,
//               color: PAPER,
//               boxShadow: "3px 3px 0 0 rgba(32,26,20,0.25)",
//             }}
//           >
//             SPU Freshy Day • Playground 2026
//           </span>

//           <div>
//             <span
//               className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold border-2 rotate-1 ${currentDept.theme.badgeBg} ${currentDept.theme.badgeText} ${currentDept.theme.border}`}
//             >
//               {currentDept.abbr}
//             </span>
//           </div>

//           <h1
//             className={`font-display comic-outline text-3xl sm:text-4xl md:text-5xl leading-tight transition-colors duration-300 ${currentDept.theme.accent}`}
//             style={{ filter: `drop-shadow(3px 3px 0 ${INK})` }}
//           >
//             {currentDept.name}
//           </h1>
//           <p className="text-xs sm:text-sm font-semibold" style={{ color: "#6b5c46" }}>
//             {currentDept.nameEn}
//           </p>
//         </div>

//         {/* โซนกดแมว POP CAT */}
//         <div className="w-full flex flex-col items-center justify-center py-6 sm:py-8">
//           <div className="text-center mb-6">
//             <span
//               className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold block mb-1"
//               style={{ color: "#6b5c46" }}
//             >
//               จำนวนคลิกของทีมนี้
//             </span>
//             <span
//               className={`font-display comic-outline text-6xl sm:text-7xl tabular-nums transition-colors duration-300 ${currentDept.theme.accent}`}
//               style={{ filter: `drop-shadow(4px 4px 0 ${INK})` }}
//             >
//               {currentScore.toLocaleString()}
//             </span>
//           </div>

//           <div className="relative">
//             {/* แสงเรืองสีประจำคณะ (เอฟเฟกต์เล็กๆ รอบปุ่ม ไม่กระทบพื้นหลังทั้งหน้า) */}
//             <div
//               className={`absolute inset-0 rounded-full blur-2xl opacity-30 transition-all duration-300 ${currentDept.theme.glow} ${isMouthOpen ? "scale-110 opacity-50" : "scale-100"
//                 }`}
//             />

//             {/* ประกายดาวตอนกด */}
//             {burstKey > 0 && (
//               <svg
//                 key={`ray-${burstKey}`}
//                 className="ray-burst absolute z-10 pointer-events-none"
//                 style={{ inset: "-18%", color: currentDept.theme.accentHex }}
//                 viewBox="0 0 100 100"
//               >
//                 {Array.from({ length: 8 }).map((_, i) => (
//                   <rect
//                     key={i}
//                     x="47"
//                     y="0"
//                     width="6"
//                     height="24"
//                     rx="3"
//                     fill="currentColor"
//                     transform={`rotate(${i * 45} 50 50)`}
//                   />
//                 ))}
//               </svg>
//             )}

//             {/* ข้อความ POP! ลอยขึ้นตอนกด */}
//             {burstKey > 0 && (
//               <span
//                 key={`pop-${burstKey}`}
//                 className="comic-pop absolute left-1/2 top-2 z-20 font-display comic-outline text-2xl sm:text-3xl pointer-events-none whitespace-nowrap"
//                 style={{ color: YELLOW }}
//               >
//                 POP!
//               </span>
//             )}

//             <button
//               onMouseDown={handlePress}
//               onMouseUp={handleRelease}
//               onMouseLeave={handleRelease}
//               onTouchStart={() => {
//                 handlePress();
//               }}
//               onTouchEnd={handleRelease}
//               onTouchCancel={handleRelease}
//               className={`relative z-0 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full flex items-center justify-center overflow-hidden cursor-pointer select-none active:outline-none transition-transform duration-75 ${isBouncing ? "translate-x-[6px] translate-y-[6px]" : ""
//                 }`}
//               style={{
//                 backgroundColor: PAPER_LIGHT,
//                 border: `5px solid ${INK}`,
//                 boxShadow: isBouncing
//                   ? `2px 2px 0 0 ${INK}`
//                   : `8px 8px 0 0 ${INK}`,
//               }}
//             >
//               <div className="relative w-full h-full pointer-events-none">
//                 <Image
//                   src={
//                     isMouthOpen
//                       ? currentDept.catImages.open
//                       : currentDept.catImages.closed
//                   }
//                   alt={currentDept.name}
//                   fill
//                   priority
//                   sizes="(max-width: 768px) 224px, 288px"
//                   className="object-cover"
//                 />
//               </div>
//             </button>
//           </div>
//         </div>

//         {/* เลือกคณะ — Custom Cartoon Dropdown */}
//         <div className="w-full space-y-2.5 relative z-10" ref={dropdownRef}>
//           <label
//             className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider block"
//             style={{ color: "#6b5c46" }}
//           >
//             เลือกคณะ หรือวิทยาลัยที่ดวงใจ
//           </label>


//           {/* ปุ่มแสดงคณะที่เลือก */}
//           <button
//             id="faculty-select"
//             type="button"
//             onClick={() => setIsDropdownOpen((o) => !o)}
//             className="w-full rounded-2xl px-4 py-3.5 text-sm font-bold cursor-pointer font-body flex items-center justify-between gap-2 transition-all duration-100 active:translate-x-[2px] active:translate-y-[2px]"
//             style={{
//               backgroundColor: PAPER_LIGHT,
//               color: INK,
//               border: `3px solid ${INK}`,
//               boxShadow: isDropdownOpen ? `2px 2px 0 0 ${INK}` : `4px 4px 0 0 ${INK}`,
//             }}
//           >
//             <span className="flex items-center gap-2 min-w-0">
//               {/* จุดสีประจำคณะ */}
//               <span
//                 className="shrink-0 w-3 h-3 rounded-full border-2"
//                 style={{
//                   backgroundColor: currentDept.theme.accentHex,
//                   borderColor: INK,
//                 }}
//               />
//               <span className="truncate">{currentDept.name}</span>
//             </span>
//             {/* ลูกศร หมุนเมื่อเปิด */}
//             <svg
//               className="shrink-0 w-4 h-4 transition-transform duration-200"
//               style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//           {/* รายการตัวเลือก */}
//           {isDropdownOpen && (
//             <ul
//               className="dropdown-slide absolute left-0 right-0 bottom-full mb-1 rounded-2xl overflow-hidden overflow-y-auto font-body"
//               style={{
//                 backgroundColor: PAPER_LIGHT,
//                 border: `3px solid ${INK}`,
//                 boxShadow: `4px 4px 0 0 ${INK}`,
//                 maxHeight: "280px",
//                 zIndex: 50,
//               }}
//             >
//               {departmentsKeys.map((key, index) => {
//                 const dept = DEPARTMENTS_CONFIG[key];
//                 const isSelected = key === selectedDeptId;
//                 return (
//                   <li key={key}>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setSelectedDeptId(key);
//                         setIsDropdownOpen(false);
//                       }}
//                       className="w-full text-left px-4 py-2.5 text-sm font-bold flex items-center gap-3 transition-colors duration-100"
//                       style={{
//                         backgroundColor: isSelected ? dept.theme.accentHex + "22" : "transparent",
//                         color: isSelected ? dept.theme.accentHex : INK,
//                         borderBottom:
//                           index < departmentsKeys.length - 1
//                             ? `2px dashed rgba(32,26,20,0.12)`
//                             : "none",
//                       }}
//                       onMouseEnter={(e) => {
//                         (e.currentTarget as HTMLButtonElement).style.backgroundColor =
//                           dept.theme.accentHex + "18";
//                       }}
//                       onMouseLeave={(e) => {
//                         (e.currentTarget as HTMLButtonElement).style.backgroundColor = isSelected
//                           ? dept.theme.accentHex + "22"
//                           : "transparent";
//                       }}
//                     >
//                       {/* จุดสีประจำคณะ */}
//                       <span
//                         className="shrink-0 w-2.5 h-2.5 rounded-full border-2"
//                         style={{
//                           backgroundColor: dept.theme.accentHex,
//                           borderColor: INK,
//                         }}
//                       />
//                       <span>{dept.name}</span>
//                       {/* เครื่องหมายถูกตัวที่เลือก */}
//                       {isSelected && (
//                         <svg
//                           className="ml-auto shrink-0 w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           style={{ color: dept.theme.accentHex }}
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="3"
//                             d="M5 13l4 4L19 7"
//                           />
//                         </svg>
//                       )}
//                     </button>
//                   </li>
//                 );
//               })}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* ท้ายหน้า */}
//       <footer
//         className="py-4 text-center text-[10px] sm:text-xs font-bold relative z-10 select-none shrink-0 font-body"
//         style={{ color: "rgba(32,26,20,0.55)", borderTop: `2px dashed rgba(32,26,20,0.25)` }}
//       >
//         SPU Freshy Day 69 • Pop Cat 🐾
//       </footer>
//     </main>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { post } from "@/app/Post";
import Link from "next/link";
import PopClose from "../pop-close/page";

interface Bubble {
  color: string;
  size: number;
  duration: number;
  left: number;
  delay: number;
  opacity: number;
}


export const DEPARTMENTS_CONFIG: Record<
  string,
  {
    name: string;
    nameEn: string;
    abbr: string;
    theme: {
      accent: string; // คลาส Tailwind สีตัวเลขคะแนน/ชื่อคณะ
      accentHex: string; // ค่าสีเดียวกัน แบบ hex ไว้ใช้กับ inline style / SVG
      badgeBg: string; // พื้นหลังป้ายตัวย่อ
      badgeText: string; // สีตัวอักษรป้ายตัวย่อ
      border: string; // สีเส้นขอบป้าย
      glow: string; // แสงเรืองรอบปุ่มกด (เอฟเฟกต์เล็กๆ ไม่ใช่พื้นหลังทั้งหน้า)
    };
    catImages: {
      closed: string;
      open: string;
    };
  }
> = {
  "digital-media": {
    name: "คณะดิจิทัลมีเดีย",
    nameEn: "School of Digital Media",
    abbr: "SDM",
    theme: {
      accent: "text-[#B5D334]",
      accentHex: "#B5D334",
      badgeBg: "bg-[#B5D334]/15",
      badgeText: "text-[#B5D334]",
      border: "border-[#B5D334]/40",
      glow: "bg-[#B5D334]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/digi01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/digi02.webp",
    },
  },
  "information-technology": {
    name: "คณะเทคโนโลยีสารสนเทศ",
    nameEn: "School of Information Technology",
    abbr: "SIT",
    theme: {
      accent: "text-[#91268f]",
      accentHex: "#91268f",
      badgeBg: "bg-[#91268f]/15",
      badgeText: "text-[#91268f]",
      border: "border-[#91268f]/40",
      glow: "bg-[#91268f]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/IT001.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/IT002.webp",
    },
  },
  "communication-arts": {
    name: "คณะนิเทศศาสตร์",
    nameEn: "School of Communication Arts",
    abbr: "CA",
    theme: {
      accent: "text-[#ffdd00]",
      accentHex: "#ffdd00",
      badgeBg: "bg-[#ffdd00]/15",
      badgeText: "text-[#ffdd00]",
      border: "border-[#ffdd00]/40",
      glow: "bg-[#ffdd00]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/Ni_TED01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/Ni_TED02.webp",
    },
  },
  engineering: {
    name: "คณะวิศวกรรมศาสตร์",
    nameEn: "School of Engineering",
    abbr: "EN",
    theme: {
      accent: "text-[#981f22]",
      accentHex: "#981f22",
      badgeBg: "bg-[#981f22]/15",
      badgeText: "text-[#981f22]",
      border: "border-[#981f22]/40",
      glow: "bg-[#981f22]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/widwa01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/widwa02.webp",
    },
  },
  "architecture-design": {
    name: "คณะการออกแบบและสถาปัตยกรรมศาสตร์",
    nameEn: "School of Architecture and Design",
    abbr: "SOA",
    theme: {
      accent: "text-[#801418]",
      accentHex: "#801418",
      badgeBg: "bg-[#801418]/15",
      badgeText: "text-[#801418]",
      border: "border-[#801418]/40",
      glow: "bg-[#801418]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/satapudV2_01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/satapudV2_02.webp",
    },
  },
  "business-administration": {
    name: "คณะบริหารธุรกิจ",
    nameEn: "School of Business Administration",
    abbr: "SBS",
    theme: {
      accent: "text-[#0B99DF]",
      accentHex: "#0B99DF",
      badgeBg: "bg-[#0B99DF]/15",
      badgeText: "text-[#0B99DF]",
      border: "border-[#0B99DF]/40",
      glow: "bg-[#0B99DF]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/borrihanV2_01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/borrihanV2_02.webp",
    },
  },
  accountancy: {
    name: "คณะบัญชี",
    nameEn: "School of Accountancy",
    abbr: "ACC",
    theme: {
      accent: "text-[#00A651]",
      accentHex: "#00A651",
      badgeBg: "bg-[#00A651]/15",
      badgeText: "text-[#00A651]",
      border: "border-[#00A651]/40",
      glow: "bg-[#00A651]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/32.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/33.webp",
    },
  },

  law: {
    name: "คณะนิติศาสตร์",
    nameEn: "School of Law",
    abbr: "LAW",
    theme: {
      accent: "text-[#EC008C]",
      accentHex: "#EC008C",
      badgeBg: "bg-[#EC008C]/15",
      badgeText: "text-[#EC008C]",
      border: "border-[#EC008C]/40",
      glow: "bg-[#EC008C]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/niti01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/niti02.webp",
    },
  },

  "liberal-arts": {
    name: "คณะศิลปศาสตร์",
    nameEn: "School of Liberal Arts",
    abbr: "LA",
    theme: {
      accent: "text-[#F5821F]",
      accentHex: "#F5821F",
      badgeBg: "bg-[#F5821F]/15",
      badgeText: "text-[#F5821F]",
      border: "border-[#F5821F]/40",
      glow: "bg-[#F5821F]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/sin_lapa01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/sin_lapa02.webp",
    },
  },

  "aviation-transportation": {
    name: "วิทยาลัยการบินการท่องเที่ยวและการบริการ",
    nameEn: "College of Aviation and Transportation",
    abbr: "CAT",
    theme: {
      accent: "text-[#D81B60]",
      accentHex: "#D81B60",
      badgeBg: "bg-[#D81B60]/15",
      badgeText: "text-[#D81B60]",
      border: "border-[#D81B60]/40",
      glow: "bg-[#D81B60]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_bin01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_bin02.webp",
    },
  },

  "international-college": {
    name: "วิทยาลัยนานาชาติ",
    nameEn: "Sripatum International College",
    abbr: "SPIC",
    theme: {
      accent: "text-[#A7B6BE]",
      accentHex: "#A7B6BE",
      badgeBg: "bg-[#A7B6BE]/15",
      badgeText: "text-[#A7B6BE]",
      border: "border-[#A7B6BE]/40",
      glow: "bg-[#A7B6BE]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/nana01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/nana02.webp",
    },
  },
  entrepreneurship: {
    name: "คณะการสร้างเจ้าของธุรกิจและการบริหารจัดการ",
    nameEn: "School of Entrepreneurship and Management",
    abbr: "SE",
    theme: {
      accent: "text-[#F92D20]",
      accentHex: "#F92D20",
      badgeBg: "bg-[#F92D20]/15",
      badgeText: "text-[#F92D20]",
      border: "border-[#F92D20]/40",
      glow: "bg-[#F92D20]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_sang01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/kan_sang02.webp",
    },
  },
  logistic: {
    name: "วิทยาลัยโลจิสติกส์และซัพพลายเชน",
    nameEn: "School of Logistics and Supply Chain Management",
    abbr: "SLSCM",
    theme: {
      accent: "text-[#00A0E3]",
      accentHex: "#00A0E3",
      badgeBg: "bg-[#00A0E3]/15",
      badgeText: "text-[#00A0E3]",
      border: "border-[#00A0E3]/40",
      glow: "bg-[#00A0E3]",
    },
    catImages: {
      closed: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/logisV2_01.webp",
      open: "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/logisV2_02.webp",
    },
  },
};


// สี "ตายตัว" ของธีมโปสเตอร์ (ไม่ขึ้นกับคณะ)
const INK = "#201A14"; // เส้นขอบ/ตัวหนังสือหลัก (เกือบดำ)
const PAPER = "#F4EAD4"; // พื้นหลังกระดาษครีม
const PAPER_LIGHT = "#FBF5E7"; // พื้นการ์ดสีอ่อนกว่า
const RED = "#E8362A";
const BLUE = "#1F4FA0";
const YELLOW = "#F6C51A";

export default function PopCatGamePage() {
  const [selectedDeptId, setSelectedDeptId] =
    useState<string>("digital-media");

  const [deptScores, setDeptScores] =
    useState<Record<string, number>>({});

  const [isMouthOpen, setIsMouthOpen] =
    useState(false);

  const [isBouncing, setIsBouncing] =
    useState(false);

  const [burstKey, setBurstKey] = useState(0);

  const [isDropdownOpen, setIsDropdownOpen] =
    useState(false);

  const [isGameOpen, setIsGameOpen] = useState<boolean | null>(null);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  /* =========================
     pending click buffer
  ========================= */
  const pendingClicks = useRef<Record<string, number>>({});
  const isFlushing = useRef(false);

  /* =========================
     current score (safe number)
  ========================= */
  const currentScore =
    Number(deptScores[selectedDeptId] ?? 0);

  /* =========================
     dropdown outside click
  ========================= */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================
     load control state
  ========================= */
  useEffect(() => {
    let isActive = true;

    const fetchControlState = async () => {
      try {
        const res = await fetch(`${post}/apinext/control`, {
          cache: "no-store",
        });
        const json = await res.json();

        if (!isActive) return;

        if (json?.success && json?.data?.type !== undefined) {
          setIsGameOpen(Boolean(json.data.type));
        } else {
          setIsGameOpen(false);
        }
      } catch (err) {
        console.error("Failed to load popcat control state", err);
        if (isActive) {
          setIsGameOpen(false);
        }
      }
    };

    void fetchControlState();

    const interval = window.setInterval(() => {
      void fetchControlState();
    }, 10000);

    return () => {
      isActive = false;
      window.clearInterval(interval);
    };
  }, []);

  /* =========================
     load scores
  ========================= */
  useEffect(() => {
    if (isGameOpen !== true) return;

    const loadScores = async () => {
      try {
        const res = await fetch(`${post}/popcar/scores`);
        const json = await res.json();

        if (!json.status) return;

        const scores: Record<string, number> = {};

        json.data.forEach((item: any) => {
          scores[item.department_key] =
            Number(item.total_clicks);
        });

        setDeptScores(scores);
      } catch (err) {
        console.error(err);
      }
    };

    loadScores();
  }, [isGameOpen]);

  /* =========================
     click handler (NO API CALL)
  ========================= */
  const handlePress = () => {
    if (isGameOpen !== true) return;

    setIsMouthOpen(true);
    setIsBouncing(true);
    setBurstKey((k) => k + 1);

    // UI update instantly
    setDeptScores((prev) => ({
      ...prev,
      [selectedDeptId]:
        Number(prev[selectedDeptId] ?? 0) + 1,
    }));

    // buffer click
    pendingClicks.current[selectedDeptId] =
      (pendingClicks.current[selectedDeptId] || 0) + 1;

    setTimeout(() => {
      setIsBouncing(false);
    }, 90);
  };

  const handleRelease = () => {
    setIsMouthOpen(false);
  };

  /* =========================
     flush to server (bulk)
  ========================= */

  const [user, setUser] = useState<{
    studentId?: string;
    studentName?: string;
  }>({});

  useEffect(() => {
    const storedUser = localStorage.getItem("popcat_user");

    if (!storedUser) return;

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      console.error("Invalid popcat_user");
    }
  }, []);


  const flushClicks = async () => {
    if (isFlushing.current || isGameOpen !== true) return;

    const entries = Object.entries(
      pendingClicks.current
    );

    if (entries.length === 0) return;

    const user = JSON.parse(
      localStorage.getItem("popcat_user") || "{}"
    );

    if (!user.studentId) return;

    isFlushing.current = true;

    try {
      for (const [departmentKey, count] of entries) {
        await fetch(`${post}/popcar/click-bulk-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            departmentKey,
            count,
            studentId: user.studentId,
          }),
        });
      }

      pendingClicks.current = {};
    } catch (err) {
      console.error(err);
    } finally {
      isFlushing.current = false;
    }
  };

  /* =========================
     flush every 30 seconds
  ========================= */
  useEffect(() => {
    if (isGameOpen !== true) return;

    const interval = setInterval(() => {
      flushClicks();
    }, 15000);

    return () => clearInterval(interval);
  }, [isGameOpen]);

  const currentDept =
    DEPARTMENTS_CONFIG[selectedDeptId] ??
    DEPARTMENTS_CONFIG["digital-media"];

  /* =========================
     send last data before close
  ========================= */
  useEffect(() => {
    if (isGameOpen !== true) return;

    const handleBeforeUnload = () => {
      const data = JSON.stringify(pendingClicks.current);

      navigator.sendBeacon(
        `${post}/popcar/click-bulk`,
        data
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isGameOpen]);

  const departmentsKeys =
    Object.keys(DEPARTMENTS_CONFIG);

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

  const [bubbles, setBubbles] = useState<Bubble[]>([]);

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


  if (isGameOpen === false) {
    return <PopClose />;
  }

  if (isGameOpen === null) {
    return (
      <main
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-body"
        style={{ backgroundColor: PAPER, color: INK }}
      >
        <div className="rounded-3xl border-4 px-6 py-8 text-center shadow-[8px_8px_0_0_rgba(32,26,20,0.25)]"
          style={{ backgroundColor: PAPER_LIGHT, borderColor: INK }}>
          <p className="font-display text-2xl">กำลังเชื่อมสถานะเกม...</p>
          <p className="mt-2 text-sm" style={{ color: "rgba(32,26,20,0.65)" }}>
            กรุณารอสักครู่
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="relative min-h-screen w-full flex flex-col overflow-hidden font-body"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* ===================================================================
          ฟอนต์การ์ตูน: Titan One (หัวข้อ/ตัวเลข ทรงบับเบิ้ลหนา) + Baloo 2 (ตัวอักษรทั่วไป)
          ถ้าต้องการประสิทธิภาพดีขึ้น แนะนำย้ายไปโหลดผ่าน next/font ใน layout.tsx แทน
          =================================================================== */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Titan+One&family=Baloo+2:wght@400;500;600;700;800&display=swap");
        @keyframes dropdown-slide {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .dropdown-slide {
          animation: dropdown-slide 0.18s ease-out forwards;
        }
        .font-display {
          font-family: "Titan One", system-ui, sans-serif;
        }
        .font-body {
          font-family: "Baloo 2", system-ui, sans-serif;
        }
        .comic-outline {
          -webkit-text-stroke: 2.5px ${INK};
          paint-order: stroke fill;
        }
        @keyframes comic-pop {
          0% {
            opacity: 0;
            transform: translate(-50%, 0%) scale(0.5) rotate(-8deg);
          }
          35% {
            opacity: 1;
            transform: translate(-50%, -70%) scale(1.15) rotate(4deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -130%) scale(0.9) rotate(-3deg);
          }
        }
        .comic-pop {
          animation: comic-pop 0.55s ease-out forwards;
        }
        @keyframes ray-burst {
          0% {
            opacity: 0.9;
            transform: scale(0.4) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(1.6) rotate(14deg);
          }
        }
        .ray-burst {
          animation: ray-burst 0.5s ease-out forwards;
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(var(--r, 0deg));
          }
          50% {
            transform: translateY(-8px) rotate(var(--r, 0deg));
          }
        }
        .float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        @keyframes spin-slow {
          to {
            transform: rotate(360deg);
          }
        }
        .spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>

      <div className="p-4 flex gap-3 items-center z-[999]">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-all duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          ย้อนกลับ
        </button>
      </div>

      {/* พื้นผิวฮาล์ฟโทน (จุดจางๆ) ให้ความรู้สึกงานพิมพ์การ์ตูน */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(32,26,20,0.07) 1px, transparent 1.6px)`,
          backgroundSize: "16px 16px",
        }}
      />

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

      {/* ===================== ของตกแต่งมุมจอ (คงที่ ไม่ผูกกับคณะ) ===================== */}

      {/* ลายตารางหมากรุก มุมขวาบน */}
      <div
        className="absolute -top-8 -right-10 w-32 h-32 sm:w-44 sm:h-44 rotate-12 opacity-90 pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${INK} 25%, transparent 25%),
            linear-gradient(-45deg, ${INK} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${INK} 75%),
            linear-gradient(-45deg, transparent 75%, ${INK} 75%)`,
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0, 0 9px, 9px -9px, -9px 0px",
          maskImage:
            "radial-gradient(circle at 30% 70%, black 55%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at 30% 70%, black 55%, transparent 90%)",
        }}
      />

      {/* ลายตารางหมากรุก มุมขวาล่าง */}
      <div
        className="absolute -bottom-10 -right-8 w-28 h-28 sm:w-36 sm:h-36 -rotate-6 opacity-80 pointer-events-none hidden sm:block"
        style={{
          backgroundImage: `
            linear-gradient(45deg, ${INK} 25%, transparent 25%),
            linear-gradient(-45deg, ${INK} 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, ${INK} 75%),
            linear-gradient(-45deg, transparent 75%, ${INK} 75%)`,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          maskImage:
            "radial-gradient(circle at 70% 30%, black 55%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at 70% 30%, black 55%, transparent 90%)",
        }}
      />

      {/* ดาวกระจายสีแดง มุมซ้ายบน */}
      <svg
        className="float-slow absolute top-6 left-3 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none"
        style={{ color: RED, filter: `drop-shadow(2px 2px 0 ${INK})`, ["--r" as string]: "-8deg" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 2 L61 36 L97 36 L68 57 L79 91 L50 70 L21 91 L32 57 L3 36 L39 36 Z" />
      </svg>

      {/* หน้ายิ้มในวงกลมเหลือง มุมขวาบน (ใกล้ตาราง) */}
      <div
        className="float-slow absolute top-5 right-8 sm:right-12 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center pointer-events-none"
        style={{ backgroundColor: YELLOW, border: `3px solid ${INK}`, ["--r" as string]: "6deg" }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={INK} strokeWidth="2">
          <circle cx="9" cy="10" r="1.1" fill={INK} stroke="none" />
          <circle cx="15" cy="10" r="1.1" fill={INK} stroke="none" />
          <path d="M8 15c1.2 1.4 2.7 2 4 2s2.8-.6 4-2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ก้อนสีน้ำเงินทรงอิสระ มุมซ้ายล่าง */}
      <div
        className="absolute -bottom-12 -left-12 w-40 h-40 sm:w-56 sm:h-56 opacity-85 pointer-events-none"
        style={{
          backgroundColor: BLUE,
          borderRadius: "58% 42% 63% 37% / 41% 55% 45% 59%",
        }}
      />

      {/* ดอกไม้เล็กๆ บนก้อนสีน้ำเงิน */}
      <svg
        className="float-slow absolute bottom-10 left-6 sm:left-10 w-9 h-9 sm:w-11 sm:h-11 pointer-events-none"
        style={{ color: YELLOW, ["--r" as string]: "10deg" }}
        viewBox="0 0 40 40"
        fill="currentColor"
      >
        <circle cx="20" cy="10" r="7" />
        <circle cx="20" cy="30" r="7" />
        <circle cx="10" cy="20" r="7" />
        <circle cx="30" cy="20" r="7" />
        <circle cx="20" cy="20" r="6" fill={INK} />
      </svg>

      {/* ลูกโลกโครงลวด หมุนช้าๆ ฝั่งซ้าย (โชว์เฉพาะจอที่กว้างพอ) */}
      <svg
        className="spin-slow absolute top-1/3 -left-7 w-16 h-16 opacity-25 pointer-events-none hidden sm:block"
        viewBox="0 0 60 60"
        fill="none"
        stroke={INK}
        strokeWidth="1"
      >
        <circle cx="30" cy="30" r="26" />
        <ellipse cx="30" cy="30" rx="26" ry="10" />
        <ellipse cx="30" cy="30" rx="10" ry="26" />
        <line x1="4" y1="30" x2="56" y2="30" />
      </svg>

      {/* ===================== เนื้อหาหลัก ===================== */}
      <div className="flex-1 flex flex-col items-center justify-between px-5 pt-14 pb-10 relative z-10 w-full max-w-md sm:max-w-lg mx-auto">
        {/* หัวเรื่อง */}
        <div className="text-center space-y-3 mt-2">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider -rotate-2"
            style={{
              backgroundColor: INK,
              color: PAPER,
              boxShadow: "3px 3px 0 0 rgba(32,26,20,0.25)",
            }}
          >
            SPU Freshy Day • Playground 2026
          </span>

          <div>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold border-2 rotate-1 ${currentDept.theme.badgeBg} ${currentDept.theme.badgeText} ${currentDept.theme.border}`}
            >
              {currentDept.abbr}
            </span>
          </div>

          <h1
            className={`font-display comic-outline text-3xl sm:text-4xl md:text-5xl leading-tight transition-colors duration-300 ${currentDept.theme.accent}`}
            style={{ filter: `drop-shadow(3px 3px 0 ${INK})` }}
          >
            {currentDept.name}
          </h1>
          <p className="text-xs sm:text-sm font-semibold" style={{ color: "#6b5c46" }}>
            {currentDept.nameEn}
          </p>
        </div>

        {/* โซนกดแมว POP CAT */}
        <div className="w-full flex flex-col items-center justify-center py-6 sm:py-8">
          <div className="text-center mb-6">
            <span
              className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold block mb-1"
              style={{ color: "#6b5c46" }}
            >
              จำนวนคลิกของทีมนี้
            </span>
            <span
              className={`font-display comic-outline text-6xl sm:text-7xl tabular-nums transition-colors duration-300 ${currentDept.theme.accent}`}
              style={{ filter: `drop-shadow(4px 4px 0 ${INK})` }}
            >
              {currentScore.toLocaleString()}
            </span>
          </div>

          <div className="relative">
            {/* แสงเรืองสีประจำคณะ (เอฟเฟกต์เล็กๆ รอบปุ่ม ไม่กระทบพื้นหลังทั้งหน้า) */}
            <div
              className={`absolute inset-0 rounded-full blur-2xl opacity-30 transition-all duration-300 ${currentDept.theme.glow} ${isMouthOpen ? "scale-110 opacity-50" : "scale-100"
                }`}
            />

            {/* ประกายดาวตอนกด */}
            {burstKey > 0 && (
              <svg
                key={`ray-${burstKey}`}
                className="ray-burst absolute z-10 pointer-events-none"
                style={{ inset: "-18%", color: currentDept.theme.accentHex }}
                viewBox="0 0 100 100"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="47"
                    y="0"
                    width="6"
                    height="24"
                    rx="3"
                    fill="currentColor"
                    transform={`rotate(${i * 45} 50 50)`}
                  />
                ))}
              </svg>
            )}

            {/* ข้อความ POP! ลอยขึ้นตอนกด */}
            {burstKey > 0 && (
              <span
                key={`pop-${burstKey}`}
                className="comic-pop absolute left-1/2 top-2 z-20 font-display comic-outline text-2xl sm:text-3xl pointer-events-none whitespace-nowrap"
                style={{ color: YELLOW }}
              >
                POP!
              </span>
            )}

            <button
              onMouseDown={handlePress}
              onMouseUp={handleRelease}
              onMouseLeave={handleRelease}
              onTouchStart={() => {
                handlePress();
              }}
              onTouchEnd={handleRelease}
              onTouchCancel={handleRelease}
              className={`relative z-0 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full flex items-center justify-center overflow-hidden cursor-pointer select-none active:outline-none transition-transform duration-75 ${isBouncing ? "translate-x-[6px] translate-y-[6px]" : ""
                }`}
              style={{
                backgroundColor: PAPER_LIGHT,
                border: `5px solid ${INK}`,
                boxShadow: isBouncing
                  ? `2px 2px 0 0 ${INK}`
                  : `8px 8px 0 0 ${INK}`,
              }}
            >
              <div className="relative w-full h-full pointer-events-none">
                <Image
                  src={
                    isMouthOpen
                      ? currentDept.catImages.open
                      : currentDept.catImages.closed
                  }
                  alt={currentDept.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 224px, 288px"
                  className="object-cover"
                />
              </div>
            </button>
          </div>
        </div>

        {/* เลือกคณะ — Custom Cartoon Dropdown */}
        <div className="w-full space-y-2.5 relative z-10" ref={dropdownRef}>
          <label
            className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider block"
            style={{ color: "#6b5c46" }}
          >
            เลือกคณะ หรือวิทยาลัยที่ดวงใจ
          </label>


          {/* ปุ่มแสดงคณะที่เลือก */}
          <button
            id="faculty-select"
            type="button"
            onClick={() => setIsDropdownOpen((o) => !o)}
            className="w-full rounded-2xl px-4 py-3.5 text-sm font-bold cursor-pointer font-body flex items-center justify-between gap-2 transition-all duration-100 active:translate-x-[2px] active:translate-y-[2px]"
            style={{
              backgroundColor: PAPER_LIGHT,
              color: INK,
              border: `3px solid ${INK}`,
              boxShadow: isDropdownOpen ? `2px 2px 0 0 ${INK}` : `4px 4px 0 0 ${INK}`,
            }}
          >
            <span className="flex items-center gap-2 min-w-0">
              {/* จุดสีประจำคณะ */}
              <span
                className="shrink-0 w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: currentDept.theme.accentHex,
                  borderColor: INK,
                }}
              />
              <span className="truncate">{currentDept.name}</span>
            </span>
            {/* ลูกศร หมุนเมื่อเปิด */}
            <svg
              className="shrink-0 w-4 h-4 transition-transform duration-200"
              style={{ transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* รายการตัวเลือก */}
          {isDropdownOpen && (
            <ul
              className="dropdown-slide absolute left-0 right-0 bottom-full mb-1 rounded-2xl overflow-hidden overflow-y-auto font-body"
              style={{
                backgroundColor: PAPER_LIGHT,
                border: `3px solid ${INK}`,
                boxShadow: `4px 4px 0 0 ${INK}`,
                maxHeight: "280px",
                zIndex: 50,
              }}
            >
              {departmentsKeys.map((key, index) => {
                const dept = DEPARTMENTS_CONFIG[key];
                const isSelected = key === selectedDeptId;
                return (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDeptId(key);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm font-bold flex items-center gap-3 transition-colors duration-100"
                      style={{
                        backgroundColor: isSelected ? dept.theme.accentHex + "22" : "transparent",
                        color: isSelected ? dept.theme.accentHex : INK,
                        borderBottom:
                          index < departmentsKeys.length - 1
                            ? `2px dashed rgba(32,26,20,0.12)`
                            : "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor =
                          dept.theme.accentHex + "18";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.backgroundColor = isSelected
                          ? dept.theme.accentHex + "22"
                          : "transparent";
                      }}
                    >
                      {/* จุดสีประจำคณะ */}
                      <span
                        className="shrink-0 w-2.5 h-2.5 rounded-full border-2"
                        style={{
                          backgroundColor: dept.theme.accentHex,
                          borderColor: INK,
                        }}
                      />
                      <span>{dept.name}</span>
                      {/* เครื่องหมายถูกตัวที่เลือก */}
                      {isSelected && (
                        <svg
                          className="ml-auto shrink-0 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          style={{ color: dept.theme.accentHex }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* ท้ายหน้า */}
      <footer
        className="py-4 text-center text-[10px] sm:text-xs font-bold relative z-10 select-none shrink-0 font-body"
        style={{ color: "rgba(32,26,20,0.55)", borderTop: `2px dashed rgba(32,26,20,0.25)` }}
      >
        SPU Freshy Day 69 • Pop Cat 🐾
      </footer>
    </main>
  );
}