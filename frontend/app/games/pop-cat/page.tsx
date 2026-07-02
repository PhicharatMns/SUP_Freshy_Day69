"use client";

import { useState } from "react";
import Image from "next/image";

// =========================================================================
// ⚙️ การตั้งค่าข้อมูลของแต่ละคณะ
// พื้นหลัง/ธีมหลักของทั้งหน้าตอนนี้ "คงที่" ตามธีมโปสเตอร์ SPU Freshy Day
// เปลี่ยนคณะแล้วจะไม่เปลี่ยนพื้นหลังอีกต่อไป — จะเปลี่ยนแค่สีเน้น (accent)
// ของป้ายคณะ / ตัวเลขคะแนน / เส้นขอบป้าย เท่านั้น
// =========================================================================
const DEPARTMENTS_CONFIG: Record<
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
      closed: "/image/popcat/digi01.png",
      open: "/image/popcat/digi02.png",
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
      closed: "/image/popcat/information-technology-closed.png",
      open: "/image/popcat/information-technology-open.png",
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
      closed: "/image/popcat/communication-arts-closed.png",
      open: "/image/popcat/communication-arts-open.png",
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
      closed: "/image/popcat/engineering-closed.png",
      open: "/image/popcat/engineering-open.png",
    },
  },
  "architecture-design": {
    name: "คณะสถาปัตยกรรมศาสตร์และการออกแบบ",
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
      closed: "/image/popcat/architecture-design-closed.png",
      open: "/image/popcat/architecture-design-open.png",
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
      closed: "/image/popcat/business-administration-closed.png",
      open: "/image/popcat/business-administration-open.png",
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
    closed: "/image/popcat/accountancy-closed.png",
    open: "/image/popcat/accountancy-open.png",
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
    closed: "/image/popcat/law-closed.png",
    open: "/image/popcat/law-open.png",
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
    closed: "/image/popcat/liberal-arts-closed.png",
    open: "/image/popcat/liberal-arts-open.png",
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
    closed: "/image/popcat/aviation-transportation-closed.png",
    open: "/image/popcat/aviation-transportation-open.png",
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
    closed: "/image/popcat/international-college-closed.png",
    open: "/image/popcat/international-college-open.png",
  },
},

interdisciplinary: {
  name: "คณะสหวิทยาการ เทคโนโลยีและนวัตกรรม",
  nameEn: "School of Interdisciplinary Technology and Innovation",
  abbr: "SITI",
  theme: {
    accent: "text-[#55C6E0]",
    accentHex: "#55C6E0",
    badgeBg: "bg-[#55C6E0]/15",
    badgeText: "text-[#55C6E0]",
    border: "border-[#55C6E0]/40",
    glow: "bg-[#55C6E0]",
  },
  catImages: {
    closed: "/image/popcat/interdisciplinary-closed.png",
    open: "/image/popcat/interdisciplinary-open.png",
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
    closed: "/image/popcat/entrepreneurship-closed.png",
    open: "/image/popcat/entrepreneurship-open.png",
  },
}
};


// สี "ตายตัว" ของธีมโปสเตอร์ (ไม่ขึ้นกับคณะ)
const INK = "#201A14"; // เส้นขอบ/ตัวหนังสือหลัก (เกือบดำ)
const PAPER = "#F4EAD4"; // พื้นหลังกระดาษครีม
const PAPER_LIGHT = "#FBF5E7"; // พื้นการ์ดสีอ่อนกว่า
const RED = "#E8362A";
const BLUE = "#1F4FA0";
const YELLOW = "#F6C51A";

export default function PopCatGamePage() {
  const [selectedDeptId, setSelectedDeptId] = useState<string>("digital-media");
  const [deptScores, setDeptScores] = useState<Record<string, number>>({});
  const [isMouthOpen, setIsMouthOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  // เพิ่มเลขนี้ทุกครั้งที่กด เพื่อ "รีสตาร์ท" แอนิเมชันป๊อป/ประกายดาว
  const [burstKey, setBurstKey] = useState(0);

  const currentDept =
    DEPARTMENTS_CONFIG[selectedDeptId] || DEPARTMENTS_CONFIG["digital-media"];
  const currentScore = deptScores[selectedDeptId] || 0;

  const handlePress = () => {
    setIsMouthOpen(true);
    setIsBouncing(true);
    setBurstKey((k) => k + 1);

    setDeptScores((prev) => ({
      ...prev,
      [selectedDeptId]: (prev[selectedDeptId] || 0) + 1,
    }));

    /*
    const audio = new Audio("/sound/pop.mp3");
    audio.play().catch(() => {});
    */

    setTimeout(() => {
      setIsBouncing(false);
    }, 90);
  };

  const handleRelease = () => {
    setIsMouthOpen(false);
  };

  const departmentsKeys = Object.keys(DEPARTMENTS_CONFIG);

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

      {/* พื้นผิวฮาล์ฟโทน (จุดจางๆ) ให้ความรู้สึกงานพิมพ์การ์ตูน */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(32,26,20,0.07) 1px, transparent 1.6px)`,
          backgroundSize: "16px 16px",
        }}
      />

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
              className={`absolute inset-0 rounded-full blur-2xl opacity-30 transition-all duration-300 ${currentDept.theme.glow} ${
                isMouthOpen ? "scale-110 opacity-50" : "scale-100"
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
              onTouchStart={(e) => {
                e.preventDefault();
                handlePress();
              }}
              onTouchEnd={handleRelease}
              onTouchCancel={handleRelease}
              className={`relative z-0 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-full flex items-center justify-center overflow-hidden cursor-pointer select-none active:outline-none transition-transform duration-75 ${
                isBouncing ? "translate-x-[6px] translate-y-[6px]" : ""
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

        {/* เลือกคณะ */}
        <div className="w-full space-y-2.5 relative z-10">
          <label
            htmlFor="faculty-select"
            className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider block"
            style={{ color: "#6b5c46" }}
          >
            เลือกคณะของคุณ (รวม 14 คณะ):
          </label>
          <div className="relative">
            <select
              id="faculty-select"
              value={selectedDeptId}
              onChange={(e) => setSelectedDeptId(e.target.value)}
              className="w-full rounded-2xl px-4 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 cursor-pointer appearance-none font-body"
              style={{
                backgroundColor: PAPER_LIGHT,
                color: INK,
                border: `3px solid ${INK}`,
                boxShadow: `4px 4px 0 0 ${INK}`,
              }}
            >
              {departmentsKeys.map((key) => (
                <option
                  key={key}
                  value={key}
                  className="font-body"
                  style={{ backgroundColor: PAPER_LIGHT, color: INK }}
                >
                  {DEPARTMENTS_CONFIG[key].name}
                </option>
              ))}
            </select>
            <div
              className="absolute inset-y-0 right-4 flex items-center pointer-events-none"
              style={{ color: INK }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
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