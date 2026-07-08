"use client";

import Image from "next/image";
import BK from "../SPU/Home/page/Bk";
import Link from "next/link";
import { motion } from 'motion/react'

export default function Developer() {
    return (
        <div className="md:w-full h-screen relative">

            <div className="relative z-[999] p-4 flex gap-3 items-center">
                <Link href={'/Freshy69'}

                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 transition-all duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    ย้อนกลับ
                </Link>
            </div>

            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/msBK.webp"
                    alt="bk"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>

            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-slate-900/10 backdrop-blur-xs p-4">
                <motion.div className="relative w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/60 p-8 transition-all hover:shadow-2xl">

                    {/* หัวข้อ */}
                    <div className="border-t border-slate-200/60 pt-5 text-center space-y-1">
                        <p className="text-sm font-semibold text-slate-700">
                            นักศึกษาคณะเทคโนโลยีสารสนเทศ
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                            มหาวิทยาลัยศรีปทุม
                        </p>
                    </div>

                    {/* รายชื่อสมาชิก */}
                    <div className="space-y-2.5 my-6">
                        {[
                            "นาย : พิชรัตน์ มีสรรพวงศ์",
                            "นาย : ภาณุพัฒน์ อ่อนตา",
                            "นาย : อานัส มุขมุกดา",
                            "นาย : นายภูรี ปัดภัย",
                        ].map((name, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 hover:bg-white/90 border border-slate-100/80 transition-all"
                            >

                                <p className="font-medium text-slate-700 text-sm md:text-base">
                                    {name}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ข้อมูลสถาบัน */}


                </motion.div>
            </motion.div>
        </div>
    )
}