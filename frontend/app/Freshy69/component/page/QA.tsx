'use client'

import { motion } from 'motion/react';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { propspopup } from '../../formsup';
import Image from 'next/image';
import { post } from '@/app/Post';
import axios from 'axios';

interface propsQa {
    setpoup: React.Dispatch<SetStateAction<propspopup>>;
    refreshQa?: () => Promise<void>;
}

export default function Qa({ setpoup, refreshQa }: propsQa) {

    const [introText, setIntroText] = useState("");
    const [feelingText, setFeelingText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // 💡 ฟังก์ชันบีบอัดรูปภาพด้วย Canvas (ลดขนาดไฟล์เพื่อไม่ให้หลังบ้านพัง)
    const resizeImage = (file: File, maxWidth = 1024, maxHeight = 1024): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new window.Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);

                    // แปลงเป็น jpeg คุณภาพ 75% ขนาดไฟล์จะเหลือเบามาก
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Canvas to Blob failed"));
                    }, "image/jpeg", 0.75);
                };
            };
            reader.onerror = (error) => reject(error);
        });
    };

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
        if (!introText.trim() || !feelingText.trim()) {
            alert("กรุณากรอกข้อมูลให้ครบถ้วนนะครับ");
            return;
        }

        setLoading(true);

        if (!post) {
            alert('ไม่พบค่า NEXT_PUBLIC_API_URL กรุณาตั้งค่า .env.local ให้ถูกต้อง');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('studentName', introText.trim());
        formData.append('feelingText', feelingText.trim());

        if (imageFile) {
            try {
                // 💡 เรียกใช้ฟังก์ชันบีบอัดรูปภาพก่อนนำเข้า FormData
                const resizedBlob = await resizeImage(imageFile);
                formData.append('studentImage', resizedBlob, imageFile.name || "upload.jpg");
            } catch (err) {
                console.error("Resize error:", err);
                alert("เกิดข้อผิดพลาดในการประมวลผลรูปภาพ");
                setLoading(false);
                return;
            }
        }

        // 💡 ปรับ Endpoint แก้ไขพาร์ทเบิ้ลซ้ำ (จากเดิม Qafrom/Qafrom -> Qafrom)
        const targetUrl = `${post}/Qafrom/Qafrom`;
        console.log("กำลังส่งข้อมูลไปที่ URL:", targetUrl);

        try {
            const response = await axios.post(targetUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                await refreshQa?.();
                clearpopup();
            } else {
                alert(`บันทึกไม่สำเร็จ: ${response.data.message || 'เกิดข้อผิดพลาด'}`);
            }
        } catch (error: any) {
            console.error("รายละเอียด Error:", error);

            if (error.response?.status === 404) {
                alert(`Error 404: ไม่พบปลายทางที่ ${targetUrl}\nโปรดตรวจสอบ API Endpoint ใน Backend ของคุณ`);
            } else {
                alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='absolute inset-0 flex flex-col items-center md:justify-center justify-end w-full h-screen bg-black/20 backdrop-blur-sm z-50'>
            <motion.div className="bg-white w-full max-w-md h-[85%] md:h-auto md:max-h-[90%] rounded-t-[20px] md:rounded-[20px] shadow-2xl flex flex-col overflow-hidden">

                <div className="flex justify-end px-4 pt-4">
                    <button
                        disabled={loading}
                        onClick={clearpopup}
                        type="button"
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 pb-6 overflow-y-auto w-full">
                    <div className="flex flex-col w-full gap-6">
                        {/* ส่วนอัปโหลดรูป */}
                        <div className="flex flex-col gap-2 w-full">
                            <span className="text-sm font-semibold text-gray-700">รูปถ่ายนักศึกษา</span>
                            <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-purple-400 transition-all cursor-pointer overflow-hidden">
                                {previewUrl ? (
                                    <div className="relative w-full h-full">
                                        <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm font-medium">เปลี่ยนรูป</div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                        <svg className="w-10 h-10 mb-3 text-slate-400 group-hover:text-blue-500 group-hover:scale-110 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="mb-1 text-sm font-medium text-slate-700">
                                            <span className="text-blue-600 font-semibold underline">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
                                        </p>
                                        <p className="text-xs text-slate-500 font-normal">เพิ่มรูปของนักศึกษา (รองรับ JPG, PNG)</p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    disabled={loading}
                                />
                            </label>
                        </div>

                        {/* Input Fields */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">ชื่อ</label>
                                <input
                                    maxLength={40}
                                    value={introText}
                                    onChange={(e) => setIntroText(e.target.value)}
                                    className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 focus:border-purple-500 outline-none"
                                    placeholder="น้องชื่ออะรายยย"
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700 block mb-1">อยากถามอะไรพี่ๆ</label>
                                <textarea
                                    maxLength={80}
                                    value={feelingText}
                                    onChange={(e) => setFeelingText(e.target.value)}
                                    className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 focus:border-purple-500 outline-none resize-none"
                                    rows={3}
                                    placeholder="พิมพ์ตรงนี้..."
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* ปุ่มกด */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full py-3 rounded-[12px] text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 transition-all flex justify-center items-center gap-2"
                        >
                            {loading ? "กำลังบันทึก..." : "ยืนยัน"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}