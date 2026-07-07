"use client";

// =========================================================================
// 🚧 หน้า "Pop Cat ปิดระบบชั่วคราว"
// ใช้ธีมโปสเตอร์ SPU Freshy Day (กระดาษครีม + หมึกเข้ม + สีสด)
// ไม่มี state ที่ซับซ้อน — แค่แสดง UI สวยๆ บอกว่าปิดระบบ
// =========================================================================

// สีธีมโปสเตอร์ (เหมือนกับหน้า pop-cat หลัก)
const INK = "#201A14";       // หมึกเข้ม (เกือบดำ) — ขอบ / ตัวอักษรหลัก
const PAPER = "#F4EAD4";     // พื้นหลังกระดาษครีม
const PAPER_LIGHT = "#FBF5E7"; // การ์ดสีอ่อนกว่า
const RED = "#E8362A";       // สีแดงสด
const BLUE = "#1F4FA0";      // สีน้ำเงินเข้ม
const YELLOW = "#F6C51A";    // สีเหลืองทอง

export default function PopClose() {
  return (
    <main
      className="relative min-h-screen w-full flex flex-col overflow-hidden font-body"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      {/* ===== Google Fonts + Animation keyframes ===== */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Titan+One&family=Baloo+2:wght@400;600;700;800&display=swap");

        .font-display { font-family: "Titan One", system-ui, sans-serif; }
        .font-body    { font-family: "Baloo 2",  system-ui, sans-serif; }

        /* ขอบการ์ตูนรอบตัวอักษร (stroke ต้องวาดก่อน fill จึงจะไม่บดบัง) */
        .comic-outline {
          -webkit-text-stroke: 2.5px ${INK};
          paint-order: stroke fill;
        }

        /* หายใจช้าๆ — ใช้กับ icon ลอย */
        @keyframes float-slow {
          0%, 100% { transform: translateY(0)    rotate(var(--r, 0deg)); }
          50%       { transform: translateY(-8px) rotate(var(--r, 0deg)); }
        }
        .float-slow { animation: float-slow 6s ease-in-out infinite; }

        /* หมุนช้าๆ — ลูกโลกโครงลวด */
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 20s linear infinite; }

        /* ไฟกระพริบสัญญาณ "ปิดระบบ" */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.2; }
        }
        .blink { animation: blink 1.4s ease-in-out infinite; }

        /* Pulse เบาๆ สำหรับ badge */
        @keyframes pulse-soft {
          0%, 100% { box-shadow: 4px 4px 0 0 ${INK}; }
          50%       { box-shadow: 6px 6px 0 0 ${INK}; }
        }
        .pulse-soft { animation: pulse-soft 2.5s ease-in-out infinite; }
      `}</style>

      {/* ===== พื้นผิวจุดฮาล์ฟโทน (ความรู้สึกงานพิมพ์การ์ตูน) ===== */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(32,26,20,0.08) 1px, transparent 1.8px)`,
          backgroundSize: "16px 16px",
        }}
      />

      {/* ===== ของตกแต่ง — มุมจอ (คงที่ ไม่ขึ้นกับ state) ===== */}

      {/* ลายตารางหมากรุก มุมขวาบน */}
      <div
        className="absolute -top-8 -right-10 w-32 h-32 sm:w-44 sm:h-44 rotate-12 opacity-90 pointer-events-none rounded-2xl"
        style={{
          backgroundImage: `
            linear-gradient(45deg,  ${INK} 25%, transparent 25%),
            linear-gradient(-45deg, ${INK} 25%, transparent 25%),
            linear-gradient(45deg,  transparent 75%, ${INK} 75%),
            linear-gradient(-45deg, transparent 75%, ${INK} 75%)`,
          backgroundSize: "18px 18px",
          backgroundPosition: "0 0, 0 9px, 9px -9px, -9px 0px",
          maskImage: "radial-gradient(circle at 30% 70%, black 55%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle at 30% 70%, black 55%, transparent 90%)",
        }}
      />

      {/* ลายตารางหมากรุก มุมขวาล่าง */}
      <div
        className="absolute -bottom-10 -right-8 w-28 h-28 sm:w-36 sm:h-36 -rotate-6 opacity-80 pointer-events-none hidden sm:block"
        style={{
          backgroundImage: `
            linear-gradient(45deg,  ${INK} 25%, transparent 25%),
            linear-gradient(-45deg, ${INK} 25%, transparent 25%),
            linear-gradient(45deg,  transparent 75%, ${INK} 75%),
            linear-gradient(-45deg, transparent 75%, ${INK} 75%)`,
          backgroundSize: "16px 16px",
          backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
          maskImage: "radial-gradient(circle at 70% 30%, black 55%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle at 70% 30%, black 55%, transparent 90%)",
        }}
      />

      {/* ดาวกระจายสีแดง — มุมซ้ายบน */}
      <svg
        className="float-slow absolute top-6 left-3 w-12 h-12 sm:w-16 sm:h-16 pointer-events-none"
        style={{ color: RED, filter: `drop-shadow(2px 2px 0 ${INK})`, ["--r" as string]: "-8deg" }}
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 2 L61 36 L97 36 L68 57 L79 91 L50 70 L21 91 L32 57 L3 36 L39 36 Z" />
      </svg>

      {/* หน้ายิ้ม — มุมขวาบน */}
      <div
        className="float-slow absolute top-5 right-8 sm:right-12 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center pointer-events-none"
        style={{ backgroundColor: YELLOW, border: `3px solid ${INK}`, ["--r" as string]: "6deg" }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={INK} strokeWidth="2">
          <circle cx="9"  cy="10" r="1.1" fill={INK} stroke="none" />
          <circle cx="15" cy="10" r="1.1" fill={INK} stroke="none" />
          <path d="M8 15c1.2 1.4 2.7 2 4 2s2.8-.6 4-2" strokeLinecap="round" />
        </svg>
      </div>

      {/* ก้อนสีน้ำเงินทรงอิสระ — มุมซ้ายล่าง */}
      <div
        className="absolute -bottom-12 -left-12 w-40 h-40 sm:w-56 sm:h-56 opacity-85 pointer-events-none"
        style={{ backgroundColor: BLUE, borderRadius: "58% 42% 63% 37% / 41% 55% 45% 59%" }}
      />

      {/* ดอกไม้เหลืองบนก้อนน้ำเงิน */}
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

      {/* ลูกโลกโครงลวดหมุนช้าๆ — ฝั่งซ้ายกลาง */}
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

      {/* ===== เนื้อหาหลัก ===== */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 pt-16 pb-12 relative z-10 w-full max-w-sm sm:max-w-md mx-auto gap-8">

        {/* แถบป้าย "SPU Freshy Day" */}
        <span
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider -rotate-2"
          style={{
            backgroundColor: INK,
            color: PAPER,
            boxShadow: "3px 3px 0 0 rgba(32,26,20,0.30)",
          }}
        >
          SPU Freshy Day • Playground 2026
        </span>

        {/* หัวข้อหลัก */}
        <div className="text-center space-y-4">
          <h1
            className="font-display comic-outline text-3xl sm:text-4xl md:text-[2.8rem] leading-tight"
            style={{
              color: INK,
              filter: "drop-shadow(3px 3px 0 rgba(32,26,20,0.20))",
            }}
          >
            Pop Cat ปิดระบบแล้วน้า 🐱
          </h1>
        </div>

        {/* การ์ด "Maintenance Mode" */}
        <div
          className="pulse-soft w-full max-w-xs flex flex-col items-center gap-4 px-6 py-6 rounded-3xl border-4"
          style={{
            backgroundColor: PAPER_LIGHT,
            borderColor: INK,
          }}
        >
          {/* ไฟสัญญาณ */}
          <div className="flex items-center gap-3">
            <span
              className="blink w-3.5 h-3.5 rounded-full border-2"
              style={{ backgroundColor: RED, borderColor: INK }}
            />
            <span
              className="font-display text-lg sm:text-xl tracking-wide"
              style={{ color: INK }}
            >
              กำลังตรวจสอบคะแนน
            </span>
            <span
              className="blink w-3.5 h-3.5 rounded-full border-2"
              style={{
                backgroundColor: BLUE,
                borderColor: INK,
                animationDelay: "0.7s",
              }}
            />
          </div>

          {/* แถบประ Divider */}
          <div
            className="w-full"
            style={{ borderTop: `2px dashed rgba(32,26,20,0.25)` }}
          />

          {/* ไอคอนแมว + ข้อความรอ */}
          <div className="text-center space-y-1">
            <div className="text-4xl sm:text-5xl">🐾</div>
            <p
              className="font-body text-[11px] sm:text-xs font-bold uppercase tracking-widest"
              style={{ color: "rgba(32,26,20,0.55)" }}
            >

            </p>
          </div>
        </div>

        {/* ป้ายฉลากสี (accent bar) — เหมือนแถบสีโปสเตอร์ */}
        <div className="flex items-center gap-2">
          {[RED, YELLOW, BLUE, "#B5D334", "#EC008C"].map((c, i) => (
            <div
              key={i}
              className="h-3 rounded-full border-2"
              style={{
                backgroundColor: c,
                borderColor: INK,
                width: i === 2 ? "2.5rem" : "1.25rem",
              }}
            />
          ))}
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer
        className="py-4 text-center text-[10px] sm:text-xs font-bold relative z-10 select-none shrink-0 font-body"
        style={{ color: "rgba(32,26,20,0.55)", borderTop: `2px dashed rgba(32,26,20,0.25)` }}
      >
        SPU Freshy Day 69 • Pop Cat 🐾
      </footer>
    </main>
  );
}