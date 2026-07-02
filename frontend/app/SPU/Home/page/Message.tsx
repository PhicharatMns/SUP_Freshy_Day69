'use client'
import Image from "next/image"
import { useEffect, useState } from "react";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
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
                // ใส่ ?t=... ป้องกัน Browser จำ Cache เก่า (Force Refresh)
                const response = await fetch(`${post}/Qafrom/select-qa?t=${Date.now()}`);
                const result = await response.json();

                if (result.success) {
                    setData(result.data);
                }
            } catch (error) {
                console.error("Error fetching QA data:", error);
            } finally {
                setLoading(false);
            }
        };

        // เรียกใช้งานครั้งแรกตอนเปิดหน้า
        fetchQaData();

        // ตั้งเวลาดึงข้อมูลใหม่ทุกๆ 5 วินาที
        const intervalId = setInterval(fetchQaData, 15000);

        // เคลียร์ interval
        return () => clearInterval(intervalId);
    }, []);

  

    return (
        <div className="relative w-full flex justify-end h-screen overflow-hidden ">
            <div className="flex flex-col gap-2 p-2 h-full overflow-y-auto pr-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">

                <AnimatePresence>
                    {data?.slice(0, 25).map((e, i) => {
                        return (
                            <motion.div
                                className="flex gap-5 border  w-[430px] p-3 bg-slate-50 rounded-[15px] border-gray-300"
                                key={e.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                    delay: i * 0.05
                                }}
                            >
                                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                                    <Image
                                        fill
                                        priority={true}
                                        quality={70}
                                        sizes="(max-width: 768px) 40vw ,20vw"
                                        src={e.image_url ? e.image_url : 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/spuprofile.jpg'}
                                        alt={e.student_name || "Student Profile"}
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0 flex-1">
                                    <div className="flex gap-2 truncate font-semibold text-slate-800">
                                        <p className="">
                                            N : {e.student_name}
                                        </p>
                                        <p>{e.student_name}</p>

                                    </div>
                                    <p className={`line-clamp-2 break-all text-sm leading-relaxed ${e.feeling_text === '' ? 'text-pink-500' : 'text-slate-600'}`}>
                                        <span className={'text-slate-400 font-semibold'}>ถามว่า : </span>
                                        {e.feeling_text || "ให้กําลังใจ สโม"}
                                    </p>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    )
}