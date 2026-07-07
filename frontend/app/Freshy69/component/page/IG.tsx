"use client";

import { SetStateAction, useState, ChangeEvent } from "react";
import { propspopup } from "../../formsup";
import { motion } from "motion/react";
import axios from "axios";
import { post } from "@/app/Post";
import Image from "next/image";
import { DEPARTMENTS_CONFIG } from "@/app/games/pop-cat/page";
import Cropper from "react-easy-crop";

interface propsMyslt {
    setpoup: React.Dispatch<SetStateAction<propspopup>>;
}

export default function IG({ setpoup }: propsMyslt) {

    const [introText, setIntroText] = useState("");
    const [feelingText, setFeelingText] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // 👈 เพิ่ม State สำหรับจัดการการ Loading
    const [selectedDept, setSelectedDept] = useState("digital-media");

    // ⚡ สถานะตัวแปรสำหรับการครอปรูปภาพ 1:1
    const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);

    const clearpopup = () => setpoup(prev => ({
        ...prev,
        myopenpopypIG: false
    }));

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

    // ฟังก์ชันจัดการตอนเลือกรูปภาพ
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // ส่งลิงก์ชั่วคราวไปเปิดในโมดอลครอป
            setTempImageSrc(URL.createObjectURL(file));
        }
    };

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleCropSave = async () => {
        if (!tempImageSrc || !croppedAreaPixels) return;
        setIsCropping(true);
        try {
            const image = new window.Image();
            image.src = tempImageSrc;
            await new Promise((resolve) => (image.onload = resolve));

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) throw new Error("Canvas context is null");

            // ⚡ บังคับครอบตัดและปรับขนาดเป็น 1:1 ขนาด 800px เพื่อความคมชัดสูงสุดบนจอใหญ่ และประหยัดแบนด์วิดท์
            const targetSize = Math.min(800, croppedAreaPixels.width);
            canvas.width = targetSize;
            canvas.height = targetSize;

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                targetSize,
                targetSize
            );

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const file = new File([blob], "cropped_student.jpg", { type: "image/jpeg" });
                        setImageFile(file);
                        setImagePreview(URL.createObjectURL(blob));
                        setTempImageSrc(null); // ปิดโมดอลครอป
                    }
                    setIsCropping(false);
                },
                "image/jpeg",
                0.75
            );
        } catch (error) {
            console.error("Cropping error:", error);
            alert("ไม่สามารถครอบตัดรูปภาพได้");
            setIsCropping(false);
        }
    };

    const handleSubmit = async () => {
        if (!introText.trim() || !feelingText.trim()) {
            alert("กรุณากรอก IG และความในใจ");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();

        formData.append("name", "");
        formData.append("igAccount", introText.trim());
        formData.append("quoteText", feelingText.trim());
        formData.append("type", DEPARTMENTS_CONFIG[selectedDept].name);

        if (imageFile) {
            // ไฟล์รูปได้รับการบีบอัดเป็น 1:1 (800x800px) ผ่าน Canvas เรียบร้อยแล้ว ยิงส่งได้ทันที
            formData.append("image", imageFile, "upload.jpg");
        }

        try {
            const response = await axios.post(`${post}/ig_my/insert-ig`, formData);
            if (response.data.success) {
                clearpopup();
            }
        } catch (error: any) {
            alert(error.response?.data?.message || "ส่งข้อมูลไม่สำเร็จ");
        } finally {
            setIsLoading(false);
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
                        onClick={clearpopup}
                        type="button"
                        disabled={isLoading} // 👈 ปิดไม่ให้กดปิดตอนกำลังอัปโหลด
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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

                            <label className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 transition-all duration-200 overflow-hidden relative ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-slate-100 hover:border-purple-400 cursor-pointer group'}`}>
                                {imagePreview ? (
                                    <Image
                                        fill
                                        quality={70}
                                        sizes="(max-width: 768px) 60vw"
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
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
                                    disabled={isLoading} // 👈 ปิดไม่ให้เลือกรูปเพิ่มขณะโหลด
                                />
                            </label>
                        </div>

                        <div className="flex flex-col gap-5 pt-6 w-full">

                            <div className="flex flex-col gap-2 w-full max-w-md">
                                <label className="text-sm font-medium text-gray-700 pl-1 tracking-wide">
                                    เลือกคณะ หรือ วิทยาลัย
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedDept}
                                        onChange={(e) => setSelectedDept(e.target.value)}
                                        className="w-full bg-slate-50 border border-gray-300 rounded-xl p-3 pr-10 text-gray-800 text-sm appearance-none transition-all duration-200 cursor-pointer  placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 shadow-sm"
                                    >
                                        {Object.entries(DEPARTMENTS_CONFIG).map(([key, dept]) => (
                                            <option key={key} value={key} className="text-gray-700">
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* ไอคอนลูกศรชี้ลงแบบ Custom (เรียบหรูขึ้น) */}
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* ช่อง IG */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1 items-center justify-between pr-1">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">IG</label>
                                    <span className={`text-xs ${introText.length >= 40 ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                                        {introText.length} / 40
                                    </span>
                                </div>
                                <input
                                    accept="image/*"
                                    capture="environment"
                                    maxLength={40}
                                    value={introText}
                                    onChange={(e) => setIntroText(e.target.value)}
                                    disabled={isLoading} // 👈 ล็อค Input ห้ามพิมพ์ตอนโหลด
                                    className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    type="text"
                                    placeholder="เช่น @username..."
                                />
                            </div>

                            {/* ช่องความในใจ */}
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-1 items-center justify-between pr-1">
                                    <label className="text-sm font-semibold text-gray-700 pl-1">ความในใจ</label>
                                    <span
                                        className={`text-xs ${feelingText.length >= 80 ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                                        {feelingText.length} / 80
                                    </span>
                                </div>
                                <textarea
                                    maxLength={80}
                                    value={feelingText}
                                    onChange={(e) => setFeelingText(e.target.value)}
                                    disabled={isLoading} // 👈 ล็อค Textarea ห้ามพิมพ์ตอนโหลด
                                    className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200 resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                                    rows={3}
                                    placeholder="พิมพ์ความในใจของคุณที่นี่..."
                                />
                            </div>

                            {/* ส่วนของปุ่ม กดยกเลิกและบันทึก */}
                            <div className="flex gap-3 pt-4 pb-2">
                                <button
                                    type="button"
                                    onClick={clearpopup}
                                    disabled={isLoading} // 👈 ล็อคปุ่มยกเลิก
                                    className="flex-1 py-3 rounded-[12px] text-center font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isLoading} // 👈 ล็อคปุ่มยืนยันกันกดย้ำๆ
                                    className="flex-1 py-3 rounded-[12px] text-center font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            {/* SVG วงกลมหมุนๆ (Spinner) */}
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>กำลังส่งข้อมูล...</span>
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

            {/* ⚡ โมดอลครอบรูปภาพ 1:1 แบบเต็มจอพรีเมียม */}
            {tempImageSrc && (
                <div className="fixed inset-0 bg-black/95 z-[9999] flex flex-col items-center justify-between p-6">
                    <div className="w-full text-center text-white py-2 font-bold text-lg tracking-wide mt-4">
                        ปรับแต่งตำแหน่งรูปภาพ (อัตราส่วน 1:1)
                    </div>
                    
                    <div className="relative w-full h-[55vh] max-w-md bg-zinc-950 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                        <Cropper
                            image={tempImageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <div className="w-full max-w-md space-y-5 pb-8">
                        <div className="flex items-center gap-4 text-white px-2">
                            <span className="text-xs font-semibold tracking-wider text-zinc-400">ซูม:</span>
                            <input
                                type="range"
                                min={1}
                                max={3}
                                step={0.05}
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>

                        <div className="flex gap-4 w-full px-2">
                            <button
                                type="button"
                                onClick={() => setTempImageSrc(null)}
                                disabled={isCropping}
                                className="flex-1 py-3.5 rounded-xl bg-zinc-800 text-white font-semibold cursor-pointer active:scale-95 transition-all text-sm hover:bg-zinc-700 disabled:opacity-50"
                            >
                                ยกเลิก
                            </button>
                            <button
                                type="button"
                                onClick={handleCropSave}
                                disabled={isCropping}
                                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold cursor-pointer active:scale-95 transition-all text-sm hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center gap-2"
                            >
                                {isCropping ? (
                                    <span className="w-4.5 h-4.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    "เสร็จสิ้น"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}