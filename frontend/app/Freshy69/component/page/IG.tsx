import { SetStateAction, useState, useEffect } from "react";
import { propspopup } from "../../formsup";
import { motion } from 'motion/react';

interface propsMyslt {
    setpoup: React.Dispatch<SetStateAction<propspopup>>;
}

export default function IG({ setpoup }: propsMyslt) {

    const [introText, setIntroText] = useState("");
    const [feelingText, setFeelingText] = useState("");
    
    // State สำหรับจัดการหน้าโหลด (Skeleton) ตอนดึงข้อมูล
    const [isLoading, setIsLoading] = useState(true);
    // State สำหรับตอนกดปุ่มบันทึก
    const [isSaving, setIsSaving] = useState(false);

    // 1. ฟังก์ชันดึงข้อมูลจาก API ของจริง
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // 🔴 ตรงนี้ใส่ API ดึงข้อมูลของจริงของคุณ
                // const response = await fetch('/api/get-student-data');
                // const data = await response.json();
                
                // 🟢 สมมติว่าได้ข้อมูลมาแล้วก็นำมา Set ลง State (เอาคอมเมนต์ออกเมื่อต่อ API จริง)
                // setIntroText(data.ig || "");
                // setFeelingText(data.feeling || "");

            } catch (error) {
                console.error("ดึงข้อมูลล้มเหลว:", error);
            } finally {
                // ไม่ว่าจะสำเร็จหรือพัง ก็ให้ปิด Skeleton เพื่อโชว์ฟอร์ม
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // 2. ฟังก์ชันส่งข้อมูลกลับไปที่ API เมื่อกดบันทึก
    const handleSaveData = async () => {
        if (!introText.trim() || !feelingText.trim()) {
            alert("กรุณากรอกข้อมูลให้ครบ");
            return;
        }

        setIsSaving(true); // เริ่มหมุน Loading ที่ปุ่ม
        
        try {
            // 🔴 ตรงนี้ใส่ API สำหรับบันทึกข้อมูลของคุณ
            /*
            await fetch('/api/save-student-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ig: introText,
                    feeling: feelingText
                })
            });
            */
            
            // 🟢 เมื่อบันทึกสำเร็จค่อยปิด Popup
            clearpopup();
        } catch (error) {
            console.error("บันทึกข้อมูลล้มเหลว:", error);
            alert("เกิดข้อผิดพลาดในการบันทึก");
        } finally {
            setIsSaving(false);
        }
    };

    const clearpopup = () => setpoup(prev => ({
        ...prev,
        myopenpopypIG: false
    }))

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
                        disabled={isSaving} // ปิดปุ่มกากบาทตอนกำลังเซฟ
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
                    
                    {isLoading ? (
                        /* ================== SKELETON UI ================== */
                        <div className="flex flex-col gap-5 w-full animate-pulse pt-2">
                            {/* Skeleton รูปถ่าย */}
                            <div className="flex flex-col gap-2 w-full">
                                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                                <div className="w-full h-64 bg-slate-200 rounded-2xl"></div>
                            </div>
                            
                            {/* Skeleton ช่อง IG */}
                            <div className="flex flex-col gap-2 pt-2">
                                <div className="flex justify-between pr-1">
                                    <div className="h-4 w-8 bg-slate-200 rounded"></div>
                                    <div className="h-3 w-10 bg-slate-200 rounded"></div>
                                </div>
                                <div className="h-[46px] w-full bg-slate-200 rounded-[15px]"></div>
                            </div>

                            {/* Skeleton ช่องความในใจ */}
                            <div className="flex flex-col gap-2 pt-1">
                                <div className="flex justify-between pr-1">
                                    <div className="h-4 w-16 bg-slate-200 rounded"></div>
                                    <div className="h-3 w-10 bg-slate-200 rounded"></div>
                                </div>
                                <div className="h-[102px] w-full bg-slate-200 rounded-[15px]"></div>
                            </div>

                            {/* Skeleton ปุ่ม */}
                            <div className="flex gap-3 pt-4 pb-2">
                                <div className="flex-1 h-12 bg-slate-200 rounded-[12px]"></div>
                                <div className="flex-1 h-12 bg-slate-200 rounded-[12px]"></div>
                            </div>
                        </div>
                    ) : (
                        /* ================== เนื้อหาจริง (หลังโหลดเสร็จ) ================== */
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="flex flex-col w-full"
                        >
                            <div className="flex flex-col gap-2 w-full">
                                <span className="text-sm font-semibold text-gray-700">รูปถ่ายนักศึกษา</span>

                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-purple-400 transition-all duration-200 cursor-pointer group">
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
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col gap-5 pt-6 w-full">
                                {/* ช่อง IG */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-1 items-center justify-between pr-1">
                                        <label className="text-sm font-semibold text-gray-700 pl-1">IG</label>
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
                                        className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200 resize-none"
                                        rows={3}
                                        placeholder="พิมพ์ความในใจของคุณที่นี่..."
                                    />
                                </div>

                                {/* ส่วนของปุ่ม กดยกเลิกและบันทึก */}
                                <div className="flex gap-3 pt-4 pb-2">
                                    <button 
                                        type="button"
                                        onClick={clearpopup}
                                        disabled={isSaving}
                                        className="flex-1 py-3 rounded-[12px] text-center font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ยกเลิก
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={handleSaveData}
                                        disabled={isSaving}
                                        className="flex-1 py-3 rounded-[12px] text-center font-medium text-white bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
                                    >
                                        {isSaving ? (
                                            <>
                                                {/* ไอคอนกำลังโหลด (Spinner) */}
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                บันทึก...
                                            </>
                                        ) : "บันทึก"}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}