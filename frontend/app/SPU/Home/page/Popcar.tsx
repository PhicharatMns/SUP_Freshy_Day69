'use client'
import { post } from "@/app/Post";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

// กำหนด Interface สำหรับ TypeScript (หากใช้ JS ปกติสามารถลบส่วนนี้ได้)
interface Department {
    id: string;
    department_key: string;
    department_name: string;
    total_clicks: string;
    created_at: string;
    updated_at: string;
    ImageCat: string
}

export default function Popcar() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // ดึงข้อมูลจาก API เมื่อ Component โหลดครั้งแรก
    useEffect(() => {
        //  สร้างฟังก์ชันดึงข้อมูลด้วย Axios
        const fetchData = async () => {
            try {
                const response = await axios.get(`${post}/popcar/scores`);

                if (response.data.status) {
                    setDepartments(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching data with axios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // อัปเดตข้อมูลอัตโนมัติทุกๆ 3 วินาที
        const interval = setInterval(fetchData, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed md:block hidden bottom-0 left-4  m-0">
            {/* ปรับความสูงสูงสุดไม่ให้เกิน 80% ของหน้าจอ เพื่อให้เห็นว่าติดขอบล่างและข้างใน scroll เอา */}
            <div className="w-[450px]  flex flex-col bg-gray-50 p-3 rounded-t-2xl border-gray-200 ">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-zinc-500 text-sm">กำลังโหลดข้อมูล...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* TOP 3 PODIUM - ปรับระยะห่างและลดความสูงลง */}
                        {departments.length >= 3 && (
                            <div className="mb-2">
                                <div className="flex items-end justify-center gap-2">

                                    {/* Rank 2 */}
                                    <div className="flex flex-col items-center w-32">
                                        <div className="mb-1.5 bg-slate-100 text-black rounded-xl p-1.5 w-full text-center shadow-sm border border-slate-200">
                                            <div className="font-bold text-[11px] line-clamp-1">
                                                {departments[1]?.department_name}
                                            </div>
                                            <div className="font-black text-xs mt-0.5 text-slate-700">
                                                {Number(departments[1]?.total_clicks).toLocaleString()}
                                            </div>
                                        </div>
                                        {/* แท่นโพเดียม */}
                                        <div className="w-full h-25 rounded-t-xl bg-gradient-to-t from-slate-400 to-slate-200 flex flex-col items-center justify-center shadow-inner gap-1">
                                            <div className="relative w-18 h-18 rounded-full overflow-hidden border border-white/40 shadow-sm bg-white/50">
                                                <Image
                                                    src={departments[1]?.ImageCat}
                                                    fill
                                                    quality={70}
                                                    sizes="72px"
                                                    alt={departments[1]?.ImageCat}
                                                    className="object-cover  "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rank 1 */}
                                    <div className="flex flex-col items-center w-28">
                                        <div className="text-3xl animate-bounce mb-0.5">👑</div>
                                        <div className="mb-1.5 bg-gradient-to-r from-yellow-400 to-amber-300 text-black rounded-xl p-2 w-full text-center shadow-md border border-yellow-300">
                                            <div className="font-black text-xs line-clamp-1">
                                                {departments[0]?.department_name}
                                            </div>
                                            <div className="text-base font-black mt-0.5 text-amber-950">
                                                {Number(departments[0]?.total_clicks).toLocaleString()}
                                            </div>
                                        </div>
                                        {/* แท่นโพเดียม */}
                                        <div className="w-full h-30 rounded-t-xl bg-gradient-to-t from-amber-500 via-yellow-400 to-yellow-300 flex flex-col items-center justify-center shadow-md gap-1">
                                            {/* แท่นสูง สามารถใช้รูปขนาด w-9 h-9 ได้อย่างเด่นชัด */}
                                            <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-white/60 shadow-md bg-white/50">
                                                <Image
                                                    src={departments[0]?.ImageCat}
                                                    fill
                                                    quality={70}
                                                    sizes="72px"
                                                    alt={departments[0]?.ImageCat}
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rank 3 */}
                                    <div className="flex flex-col items-center w-24">
                                        <div className="mb-1.5 bg-amber-50 text-amber-900 rounded-xl p-1.5 w-full text-center shadow-sm border border-amber-200">
                                            <div className="font-bold text-[11px] line-clamp-1">
                                                {departments[2]?.department_name}
                                            </div>
                                            <div className="font-black text-xs mt-0.5 text-amber-800">
                                                {Number(departments[2]?.total_clicks).toLocaleString()}
                                            </div>
                                        </div>
                                        {/* แท่นโพเดียม */}
                                        <div className="w-full h-20 rounded-t-xl bg-gradient-to-t from-amber-700 to-amber-500 flex flex-col items-center justify-center shadow-inner gap-0.5">
                                            {/* แท่นเตี้ยมาก (h-11) เปลี่ยนมาใช้วิธีจัดเรียงแนวนอนหรือลดขนาดรูปเหลือ w-6 h-6 เพื่อไม่ให้หลุดเฟรม */}
                                            <div className="flex items-center justify-center gap-1.5">
                                                <div className="relative w-18 h-18 rounded-full overflow-hidden border border-white/30 shadow-sm bg-white/50">
                                                    <Image
                                                        src={departments[2]?.ImageCat}
                                                        quality={70}
                                                        fill
                                                        sizes="72px"
                                                        alt={departments[2]?.ImageCat}
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* Remaining Rankings */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 px-1">
                                <div className="h-[1px] flex-1 bg-gray-300" />
                                <span className="text-zinc-400 text-[10px] font-medium tracking-wider">
                                    คณะ และ วิทยาลัยอื่นๆ
                                </span>
                                <div className="h-[1px] flex-1 bg-gray-300" />
                            </div>

                            {departments.slice(3).map((dept, index) => {
                                const rank = index + 4;
                                return (
                                    <div
                                        key={dept.id}
                                        className="group rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-all shadow-sm"
                                    >
                                        {/* ปรับลด padding ลงเหลือ py-1.5 px-3 */}
                                        <div className="flex items-center justify-between py-1.5 px-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                {/* ปรับวงกลมตัวเลขให้เล็กลงเหลือ w-8 h-8 */}
                                                <div className="w-10 h-10 relative overflow-hidden rounded-full bg-zinc-100 flex items-center justify-center font-bold text-sm text-zinc-700 shrink-0 border border-zinc-200">
                                                    <Image
                                                        src={dept?.ImageCat}
                                                        quality={70}
                                                        fill
                                                         sizes="40px"
                                                        alt={dept?.ImageCat}
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0">
                                                    <div className="font-bold text-xs text-zinc-800 truncate">
                                                        {dept.department_name}
                                                    </div>
                                                    <div className="text-[10px] uppercase text-zinc-400 truncate">
                                                        {dept.department_key}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right shrink-0">
                                                {/* ปรับสีคะแนนและขนาดฟอนต์ให้ดูนุ่มนวลขึ้น */}
                                                <div className="text-lg font-black text-emerald-600">
                                                    {Number(dept.total_clicks).toLocaleString()}
                                                </div>
                                                <div className="text-[9px] text-zinc-400 font-medium">
                                                    คะแนน
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>


    );
}


// 'use client'

// import axios from "axios";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// interface Department {
//     id: string;
//     department_key: string;
//     department_name: string;
//     total_clicks: number; // ปรับให้เป็น number เพื่อการันตีการแสดงผล
//     created_at: string;
//     updated_at: string;
//     ImageCat?: string;
//     image_cat?: string;
// }

// export default function Popcar() {
//     const [departments, setDepartments] = useState<Department[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`http://147.50.254.93:5000/popcar/scores`);
//             if (response.data && response.data.status && Array.isArray(response.data.data)) {
                
//                 // 🔥 แก้ตรงนี้: แปลง total_clicks จาก String ให้เป็น Number ชัวร์ๆ ก่อนเซตเข้า State
//                 const cleanData = response.data.data.map((item: any) => ({
//                     ...item,
//                     total_clicks: Number(item.total_clicks || 0)
//                 }));

//                 setDepartments(cleanData);
//             }
//         } catch (error) {
//             console.error("Error fetching data with axios:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//         const interval = setInterval(fetchData, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="fixed bottom-0 left-4 z-50 max-h-[85vh] w-[90vw] sm:w-[450px] overflow-y-auto m-0 shadow-2xl rounded-t-2xl border border-gray-200 bg-gray-50 p-3">
//             <div className="flex flex-col">
//                 {loading ? (
//                     <div className="flex justify-center items-center py-12">
//                         <div className="flex flex-col items-center gap-2">
//                             <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
//                             <span className="text-zinc-500 text-sm">กำลังโหลดข้อมูล...</span>
//                         </div>
//                     </div>
//                 ) : departments.length === 0 ? (
//                     <div className="text-center py-8 text-zinc-400 text-sm">
//                         ยังไม่มีข้อมูลคะแนนในระบบ
//                     </div>
//                 ) : (
//                     <>
//                         {/* 👑 TOP 3 PODIUM - ตอนนี้จะยอมแสดงผลแล้วเพราะข้อมูลเป็น Number ถูกต้อง */}
//                         <div className="mb-4">
//                             <div className="flex items-end justify-center gap-2 pt-4">

//                                 {/* Rank 2 */}
//                                 {departments[1] && (
//                                     <div className="flex flex-col items-center w-28 sm:w-32">
//                                         <div className="mb-1.5 bg-slate-100 text-black rounded-xl p-1.5 w-full text-center shadow-sm border border-slate-200">
//                                             <div className="font-bold text-[11px] line-clamp-1">{departments[1]?.department_name}</div>
//                                             <div className="font-black text-xs mt-0.5 text-slate-700">{departments[1].total_clicks.toLocaleString()}</div>
//                                         </div>
//                                         <div className="w-full h-24 rounded-t-xl bg-gradient-to-t from-slate-400 to-slate-200 flex flex-col items-center justify-center shadow-inner p-2">
//                                             <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/40 shadow-sm bg-white/50">
//                                                 <Image
//                                                     src={departments[1]?.ImageCat || departments[1]?.image_cat || "/placeholder.png"}
//                                                     fill quality={70} sizes="56px" alt="Rank 2" className="object-cover" unoptimized
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Rank 1 */}
//                                 {departments[0] && (
//                                     <div className="flex flex-col items-center w-32 sm:w-36">
//                                         <div className="text-2xl animate-bounce mb-0.5">👑</div>
//                                         <div className="mb-1.5 bg-gradient-to-r from-yellow-400 to-amber-300 text-black rounded-xl p-2 w-full text-center shadow-md border border-yellow-300">
//                                             <div className="font-black text-xs line-clamp-1">{departments[0]?.department_name}</div>
//                                             <div className="text-base font-black mt-0.5 text-amber-950">{departments[0].total_clicks.toLocaleString()}</div>
//                                         </div>
//                                         <div className="w-full h-32 rounded-t-xl bg-gradient-to-t from-amber-500 via-yellow-400 to-yellow-300 flex flex-col items-center justify-center shadow-md p-2">
//                                             <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/60 shadow-md bg-white/50">
//                                                 <Image
//                                                     src={departments[0]?.ImageCat || departments[0]?.image_cat || "/placeholder.png"}
//                                                     fill quality={70} sizes="64px" alt="Rank 1" className="object-cover" unoptimized
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Rank 3 */}
//                                 {departments[2] && (
//                                     <div className="flex flex-col items-center w-24 sm:w-28">
//                                         <div className="mb-1.5 bg-amber-50 text-amber-900 rounded-xl p-1.5 w-full text-center shadow-sm border border-amber-200">
//                                             <div className="font-bold text-[11px] line-clamp-1">{departments[2]?.department_name}</div>
//                                             <div className="font-black text-xs mt-0.5 text-amber-800">{departments[2].total_clicks.toLocaleString()}</div>
//                                         </div>
//                                         <div className="w-full h-20 rounded-t-xl bg-gradient-to-t from-amber-700 to-amber-500 flex flex-col items-center justify-center shadow-inner p-2">
//                                             <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/30 shadow-sm bg-white/50">
//                                                 <Image
//                                                     src={departments[2]?.ImageCat || departments[2]?.image_cat || "/placeholder.png"}
//                                                     fill quality={70} sizes="48px" alt="Rank 3" className="object-cover" unoptimized
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                             </div>
//                         </div>

//                         {/* 📋 รายชื่อคณะและวิทยาลัยอื่น ๆ (อันดับ 4 เป็นต้นไป) */}
//                         {departments.length > 3 && (
//                             <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
//                                 <div className="flex items-center gap-2 px-1 sticky top-0 bg-gray-50 py-1">
//                                     <div className="h-[1px] flex-1 bg-gray-300" />
//                                     <span className="text-zinc-400 text-[10px] font-medium tracking-wider">คณะ และ วิทยาลัยอื่นๆ</span>
//                                     <div className="h-[1px] flex-1 bg-gray-300" />
//                                 </div>

//                                 {departments.slice(3).map((dept, index) => (
//                                     <div key={dept.id} className="group rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-all shadow-sm">
//                                         <div className="flex items-center justify-between py-1.5 px-3">
//                                             <div className="flex items-center gap-3 min-w-0">
//                                                 <span className="text-xs font-bold text-zinc-400 w-4">{index + 4}</span>
//                                                 <div className="w-10 h-10 relative overflow-hidden rounded-full bg-zinc-100 flex items-center justify-center font-bold text-sm text-zinc-700 shrink-0 border border-zinc-200">
//                                                     <Image
//                                                         src={dept?.ImageCat || dept?.image_cat || "/placeholder.png"}
//                                                         quality={70} fill sizes="40px" alt={dept.department_name} className="object-cover" unoptimized
//                                                     />
//                                                 </div>
//                                                 <div className="min-w-0">
//                                                     <div className="font-bold text-xs text-zinc-800 truncate">{dept.department_name}</div>
//                                                     <div className="text-[10px] uppercase text-zinc-400 truncate">{dept.department_key}</div>
//                                                 </div>
//                                             </div>
//                                             <div className="text-right shrink-0">
//                                                 <div className="text-base font-black text-emerald-600">{dept.total_clicks.toLocaleString()}</div>
//                                                 <div className="text-[9px] text-zinc-400 font-medium">คะแนน</div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }