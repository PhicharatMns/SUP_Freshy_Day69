"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { post } from "@/app/Post";

interface QaData {
  id: number;
  student_name: string;
  feeling_text: string;
  image_url: string | null;
  created_at?: string;
}

export default function Message() {
  const [data, setData] = useState<QaData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQaData = async () => {
      try {
        const response = await fetch(
          `${post}/Qafrom/select-qa?t=${Date.now()}`
        );

        if (!response.ok) {
          console.error(`Failed to fetch from: ${post}/Qafrom/select-qa`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success && result.data) {
          // ⏱️ คัดกรองเอาเฉพาะข้อความ Q&A ที่มีอายุการส่งมากกว่า 5 วินาทีขึ้นไปเท่านั้น สำหรับแสดงจอใหญ่หลัก
          const filteredData = result.data.filter((q: QaData) => {
            if (!q.created_at) return true;
            const timeStr = q.created_at.replace(" ", "T");
            const parsedTime = new Date(timeStr).getTime();
            if (isNaN(parsedTime)) return true; // หากแยกแยะเวลาไม่ได้ ปล่อยผ่านทันที
            
            return Date.now() - parsedTime >= 5000;
          });
          setData(filteredData);
        }
      } catch (error) {
        console.error("Error fetching QA data:", error);
      } finally {
        setLoading(false);
      }
    };

    // เรียกใช้งานครั้งแรกตอนเปิดหน้า
    fetchQaData();

    // ตั้งเวลาดึงข้อมูลใหม่ทุกๆ 2 วินาทีเพื่อความสดใหม่ของบอร์ด
    const intervalId = setInterval(fetchQaData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const formatThaiTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

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

  return (
    // ตัวนอกสุด: ล็อกความสูงหน้าจอ และห้ามล้นออกนอกจอใหญ่
    <div className="w-full h-full md:flex hidden md:justify-end overflow-hidden pointer-events-none">
      
      {/* กล่องเลื่อน (Scroll Box): จุดนี้ใส่ pointer-events-auto เพื่อให้เมาส์สกรอลล์ตรงนี้ได้จริง ๆ */}
      <div className="w-[460px] h-full max-h-screen flex flex-col gap-3 p-4 overflow-y-auto pointer-events-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <AnimatePresence>
          {data?.slice(0, 25).map((e, i) => {
            return (
              <motion.div
                className="flex gap-5 border w-[430px] p-3 bg-slate-50 rounded-[15px] border-gray-300 shadow-sm flex-shrink-0"
                key={e.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: i * 0.05,
                }}
              >
                {/* รูปโปรไฟล์ */}
                <div className="w-12 h-12 relative rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    fill
                    priority={true}
                    quality={70}
                    sizes="48px"
                    src={normalizeImageUrl(e.image_url)}
                    alt={e.student_name || "Student Profile"}
                    className="object-cover"
                  />
                </div>

                {/* ข้อความคำถาม */}
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex gap-2 truncate font-semibold text-slate-800 mb-0.5">
                    <p className="truncate">
                      N : {e.student_name || "DEK Freshy69"}
                    </p>
                    <p className="text-gray-500">
                      {formatThaiTime(e.created_at)} น.
                    </p>
                  </div>
                  <p
                    className={`line-clamp-2 break-all text-sm leading-relaxed ${
                      e.feeling_text === "" ? "text-pink-500" : "text-slate-600 font-semibold"
                    }`}
                  >
                    <span className="text-slate-800 font-semibold">
                      ถามว่า :{" "}
                    </span>
                    {e.feeling_text || "ให้กําลังใจ สโม"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
