"use client";

import { post } from "@/app/Post";
import { propspopup } from "../../formsup";
import { motion } from 'motion/react'
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
interface propsPopuppopcat {
    setpoup: React.Dispatch<SetStateAction<propspopup>>;
}

export default function Popuppopcat({ setpoup }: propsPopuppopcat) {

    const router = useRouter();

    const [studentId, setStudentId] = useState("");
    const [studentName, setStudentName] = useState("");
    const [loading, setLoading] = useState(false);


    const clearpopup = () => setpoup((prev) => ({
        ...prev,
        popcat: false,
    }));

    const handleSubmit = async () => {
        if (!studentId.trim() || !studentName.trim()) {
            alert("กรุณากรอกรหัสนักศึกษาและชื่อ");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                `${post}/popcar/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        studentId,
                        studentName,
                    }),
                }
            );

            const result = await response.json();

            if (!result.status) {
                throw new Error(result.message);
            }

            localStorage.setItem(
                "popcat_user",
                JSON.stringify({
                    id: result.data.id,
                    studentId: result.data.student_id,
                    studentName: result.data.student_name, 
                })
            );

            router.push("/games");
        } catch (error) {
            console.error(error);
            alert("ไม่สามารถลงทะเบียนได้");
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = localStorage.getItem("popcat_user");

        if (!user) return;

        try {
            const data = JSON.parse(user);

            setStudentId(data.studentId || "");
            setStudentName(data.studentName || "");
        } catch {
            localStorage.removeItem("popcat_user");
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 flex flex-col items-center md:justify-center justify-end w-full h-screen bg-black/20 backdrop-blur-sm z-50'>
            <motion.div className="bg-white w-full max-w-md h-[85%] md:h-[700px] rounded-t-[20px] md:rounded-[20px] shadow-2xl flex flex-col overflow-hidden">
                {/* ปุ่มกากบาทปิด */}
                <div className="flex justify-end px-4 pt-4">
                    <button
                        onClick={clearpopup}
                        type="button"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* เนื้อหา */}
                <div className="px-6 pb-6 overflow-y-auto">


                    <div className="flex flex-col gap-5 pt-6 w-full">
                        {/* ช่องแนะนำตัว */}
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1 items-center justify-between pr-1">
                                <label className="text-sm font-semibold text-gray-700 pl-1">รหัสนักศึกษา</label>
                            </div>
                            <input
                                value={studentId}
                                onChange={(e) => setStudentId(e.target.value)}
                                className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                                type='number'
                                placeholder="เช่น 67134327"
                            />
                        </div>

                        {/* ช่องความในใจ */}
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1 items-center justify-between pr-1">
                                <label className="text-sm font-semibold text-gray-700 pl-1">
                                    ชื่อ - นามสกุล
                                </label>
                            </div>
                            <textarea
                                maxLength={80}
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200 resize-none"
                                rows={3}
                                placeholder="กรอกชื่อ - นามสกุล"
                            />
                        </div>

                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 text-amber-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3m0 4h.01M10.29 3.86l-7.5 13A1 1 0 003.66 18h16.68a1 1 0 00.87-1.5l-7.5-13a1 1 0 00-1.74 0z"
                                        />
                                    </svg>
                                </div>

                                <p className="text-sm leading-relaxed text-amber-900">
                                    <span className="font-semibold">ข้อมูลที่ส่งแล้วไม่สามารถแก้ไขได้</span>
                                    <br />
                                    กรุณาตรวจสอบรหัสนักศึกษา ชื่อ-นามสกุล และข้อมูลทั้งหมดให้ถูกต้อง
                                    ก่อนกดยืนยันการส่งข้อมูล
                                </p>
                            </div>
                        </div>

                        {/* ส่วนของปุ่ม (อัปเดตใหม่) */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={clearpopup}
                                className="flex-1 py-3 rounded-[12px] text-center font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all duration-200"
                            >
                                ยกเลิก
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex-1 py-3 rounded-[12px] text-center font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <svg
                                            className="w-5 h-5 animate-spin"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>

                                        <span>กำลังเข้าสู่เกม...</span>
                                    </div>
                                ) : (
                                    "บันทึก"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}