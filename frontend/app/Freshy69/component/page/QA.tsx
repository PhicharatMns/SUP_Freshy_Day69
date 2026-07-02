'use client'

import { motion } from 'motion/react';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { propspopup } from '../../formsup';
import Image from 'next/image';
import { post } from '@/app/Post';
import axios from 'axios';

interface propsQa {
    setpoup: React.Dispatch<SetStateAction<propspopup>>
}

export default function Qa({ setpoup }: propsQa) {

    const [introText, setIntroText] = useState("");
    const [feelingText, setFeelingText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null); // สำหรับเก็บก้อนไฟล์รูปเพื่อส่งไป Backend
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    //  ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้เลือกรูปภาพ
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const clearpopup = () => setpoup(prev => ({
        ...prev,
        myQa: false
    }))

    const handleSubmit = async () => {
        if (!introText || !feelingText) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วนนะครับ");
            return;
        }

        clearpopup();

        // เตรียมข้อมูล FormData
        const formData = new FormData();
        formData.append('studentName', introText.trim());
        formData.append('feelingText', feelingText.trim());

        if (imageFile) {
            formData.append('studentImage', imageFile);
        }

        try {
            // 💡 เปลี่ยนมาใช้ axios.post แทน fetch
            // ยิงข้อมูลไปที่หลังบ้านแบบ Background Process
            const response = await axios.post(`${post}/Qafrom/Qafrom`, formData);

            // Axios จะแปลง JSON มาให้เสร็จสรรพอยู่ใน response.data
            const result = response.data;

            // เช็กเงื่อนไข success ที่ส่งมาจากหลังบ้านเพิ่มเติม
            if (!result.success) {
                console.error("Backend Error:", result.message);
                alert(`ขออภัยครับ ข้อมูลของ "${introText}" บันทึกไม่สำเร็จ: ${result.message}`);
            }

        } catch (error: any) {
            console.error("Error submitting form in background:", error);
            const errorMessage = error.response?.data?.message || "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ในขณะนี้";
            alert(`เกิดข้อผิดพลาดในการบันทึกข้อมูลของ "${introText}": ${errorMessage}`);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 flex flex-col items-center md:justify-center justify-end w-full h-screen bg-black/20 backdrop-blur-sm z-50'>
            <motion.div className="bg-white w-full max-w-md h-[85%] md:h-auto md:max-h-[90%] rounded-t-[20px] md:rounded-[20px] shadow-2xl flex flex-col overflow-hidden">

                {/* ปุ่มกากบาทปิด */}
                <div className="flex justify-end px-4 pt-4">
                    <button
                        disabled={loading}
                        onClick={clearpopup}
                        type="button"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50"
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

                <div className="px-6 pb-6 overflow-y-auto w-full">


                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col w-full"
                    >
                        <div className="flex flex-col gap-2 w-full">
                            <span className="text-sm font-semibold text-gray-700">รูปถ่ายนักศึกษา</span>

                            <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-purple-400 transition-all duration-200 cursor-pointer group overflow-hidden">

                                {/*  เช็คเงื่อนไข: ถ้ามีรูปให้แสดงรูป ถ้าไม่มีให้แสดงไอคอนอัปโหลดเดิม */}
                                {previewUrl ? (
                                    <div className="relative w-full h-full group">
                                        <Image
                                            src={previewUrl}
                                            alt="Student Preview"
                                            quality={70}
                                            fill
                                            sizes="(max-width: 768px) 60vw"
                                            className="object-cover"
                                            unoptimized
                                        />
                                        {/* Hover Overlay เพื่อบอกผู้ใช้ว่าสามารถเปลี่ยนรูปได้ */}
                                        <div className="absolute inset-0 bg-black/40  opacity-100 transition-opacity duration-200 flex items-center justify-center text-white text-sm font-medium z-10">
                                            เปลี่ยนรูปถ่าย
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                        <svg
                                            className="w-10 h-10 mb-3 text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <p className="mb-1 text-sm font-medium text-slate-700">
                                            <span className="text-blue-600 font-semibold underline">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
                                        </p>
                                        <p className="text-xs text-slate-500 font-normal">
                                            เพิ่มรูปของนักศึกษา (รองรับ JPG, PNG)
                                        </p>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange} /* ใส่ฟังก์ชันจัดการเมื่อเลือกไฟล์ */
                                />
                            </label>
                        </div>

                        <div className="flex flex-col gap-5 pt-6 w-full">
                            {/* ช่อง IG */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1 items-center pr-1">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">น้องชื่ออะรายยย</label>
                                    <span className={`text-xs ${introText.length >= 40 ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                                        {introText.length} / 40
                                    </span>
                                </div>
                                <input
                                    maxLength={40}
                                    value={introText}
                                    onChange={(e) => setIntroText(e.target.value)}
                                    className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                                    type="text"
                                    disabled={loading}
                                    placeholder="เช่น สมศรีสหมีชัย"
                                />
                            </div>

                            {/* ช่องความในใจ */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1 items-center  pr-1">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">อยากถามอะไรพี่ๆ</label>
                                    <span
                                        className={`text-xs ${feelingText.length >= 80 ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                                        {feelingText.length} / 80
                                    </span>
                                </div>
                                <textarea
                                    maxLength={80}
                                    value={feelingText}
                                    disabled={loading}
                                    onChange={(e) => setFeelingText(e.target.value)}
                                    className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200 resize-none"
                                    rows={3}
                                    placeholder="คําถามที่น้องๆอยากถามพี่ๆ..."
                                />
                            </div>

                            {/* ส่วนของปุ่ม กดยกเลิกและบันทึก */}
                            <div className="flex gap-3 pt-4 pb-2">
                                <button
                                    type="button"
                                    onClick={clearpopup}
                                    disabled={loading}
                                    className="flex-1 py-3 rounded-[12px] text-center font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 py-3 rounded-[12px] text-center font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            {/* SVG วงกลมหมุนๆ (Spinner) สำหรับแจ้งว่ากำลังโหลด */}
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>กำลังบันทึก...</span>
                                        </>
                                    ) : (
                                        "ยืนยัน"
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </motion.div>
        </motion.div>
    )
}