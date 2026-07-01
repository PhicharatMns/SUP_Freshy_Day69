"use client"

import { SetStateAction } from "react"
import { propspopup } from "./page"

interface propsFormsup {
    setpopup: React.Dispatch<SetStateAction<propspopup>>
}

export default function Formsup({ setpopup }: propsFormsup) {
    const Social = [
        {
            title: 'แนะนำตัว',
            gradient: 'from-amber-400 via-pink-500 to-purple-600',
        },
        {
            title: 'IG ไอใจ',
            gradient: 'from-purple-600 via-rose-500 to-amber-500',
        }
    ]

    return (
        <div>
            <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-screen z-50 ">

                <div className="pb-2">
                    เลือกที่ชอบ เอาที่ใช้
                </div>
                {/* วางสไตล์สำหรับแอนิเมชันไว้ตรงนี้ครั้งเดียวพอครับ ไม่ต้องวนลูป */}
                <style jsx global>{`
        @keyframes gentleBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); } 
        }
        .animate-gentle-bounce {
            animation: gentleBounce 2s infinite ease-in-out;
        }
    `}</style>

                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl p-4">
                    {Social.map((e, i) => {
                        return (
                            <div
                                className={`w-full text-2xl h-40 flex items-center justify-center rounded-[20px] font-bold text-white shadow-lg bg-gradient-to-tr ${e.gradient} animate-gentle-bounce transition-all duration-300 cursor-pointer border border-white/20`}
                                key={i}
                            >
                                {e.title}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}