import { SetStateAction, useState } from "react";
import { propspopup } from "../../formsup";

interface propsMyslt {
    setpoup: React.Dispatch<SetStateAction<propspopup>>;
}

export default function IG({ setpoup }: propsMyslt) {

    const [introText, setIntroText] = useState("");
    const [feelingText, setFeelingText] = useState("");

    const clearpopup = () => setpoup(prev => ({
        ...prev,
        myself: false
    }))

    return (
        <div className='absolute inset-0 flex flex-col items-center md:justify-center justify-end w-full h-screen '>
            <div className="bg-white w-full h-[85%] rounded-t-[15]">
                <div />

                <div className=" flex justify-end px-3 pt-2">
                    <button
                        onClick={clearpopup}
                        type="button"
                        className=" flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
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

                <div className="px-5">
                    <div className="flex flex-col gap-2 w-full max-w-sm">
                        {/* ข้อความหัวข้อด้านบน (ถ้าต้องการเอาออกได้ครับ) */}
                        <span className="text-sm font-semibold text-gray-700">รูปถ่ายนักศึกษา</span>

                        <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-purple-400 transition-all duration-200 cursor-pointer group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">

                                {/* ไอคอนรูปภาพ (SVG) */}
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

                                {/* ข้อความบอกผู้ใช้ */}
                                <p className="mb-1 text-sm font-medium text-slate-700">
                                    <span className="text-blue-600 font-semibold underline">คลิกเพื่ออัปโหลด</span> หรือลากไฟล์มาวาง
                                </p>
                                <p className="text-xs text-slate-500 font-normal">
                                    เพิ่มรูปของนักศึกษา (รองรับ JPG, PNG)
                                </p>

                            </div>

                            {/* ซ่อน input  */}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                            />
                        </label>
                    </div>

                    <div className="flex flex-col gap-6 pt-5 w-full max-w-sm">
                        {/* ช่องแนะนำตัว */}
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1 items-center">
                                <label className="text-sm font-semibold text-gray-700 pl-1">IG</label>
                                <span className={`text-xs ${introText.length >= 40 ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                                    {introText.length} / 40
                                </span>
                            </div>
                            <input
                                maxLength={40}
                                className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                                type="text"
                                placeholder="เช่น ชื่อ-นามสกุล หรือชื่อเล่น..."
                            />
                        </div>

                        {/* ช่องความในใจ */}
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-1 items-center">
                                <label className="text-sm font-semibold text-gray-700 pl-1">ความในใจ</label>
                                <span
                                    className={`text-xs ${feelingText.length >= 80 ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                                    {feelingText.length} / 80
                                </span>
                            </div>
                            <textarea
                                maxLength={80}
                                className="w-full border border-slate-300 rounded-[15px] py-2.5 px-4 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200 resize-none"
                                rows={4}
                                placeholder="พิมพ์ความในใจของคุณที่นี่..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}