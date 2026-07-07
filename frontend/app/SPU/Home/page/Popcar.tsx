// 'use client'
// import { post } from "@/app/Post";
// import axios from "axios";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// // กำหนด Interface สำหรับ TypeScript (หากใช้ JS ปกติสามารถลบส่วนนี้ได้)
// interface Department {
//     id: string;
//     department_key: string;
//     department_name: string;
//     total_clicks: string;
//     created_at: string;
//     updated_at: string;
//     ImageCat: string
// }

// export default function Popcar() {
//     const [departments, setDepartments] = useState<Department[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     // ดึงข้อมูลจาก API เมื่อ Component โหลดครั้งแรก
//     useEffect(() => {
//         //  สร้างฟังก์ชันดึงข้อมูลด้วย Axios
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`${post}/popcar/scores`);

//                 if (response.data.status) {
//                     setDepartments(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching data with axios:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();

//         // อัปเดตข้อมูลอัตโนมัติทุกๆ 3 วินาที
//         const interval = setInterval(fetchData, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="fixed md:block hidden bottom-0 left-4  m-0">
//             {/* ปรับความสูงสูงสุดไม่ให้เกิน 80% ของหน้าจอ เพื่อให้เห็นว่าติดขอบล่างและข้างใน scroll เอา */}
//             <div className="w-[450px]  flex flex-col bg-gray-50 p-3 rounded-t-2xl border-gray-200 ">
//                 {loading ? (
//                     <div className="flex justify-center items-center py-12">
//                         <div className="flex flex-col items-center gap-2">
//                             <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
//                             <span className="text-zinc-500 text-sm">กำลังโหลดข้อมูล...</span>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         {/* TOP 3 PODIUM - ปรับระยะห่างและลดความสูงลง */}
//                         {departments.length >= 3 && (
//                             <div className="mb-2">
//                                 <div className="flex items-end justify-center gap-2">

//                                     {/* Rank 2 */}
//                                     <div className="flex flex-col items-center w-32">
//                                         <div className="mb-1.5 bg-slate-100 text-black rounded-xl p-1.5 w-full text-center shadow-sm border border-slate-200">
//                                             <div className="font-bold text-[11px] line-clamp-1">
//                                                 {departments[1]?.department_name}
//                                             </div>
//                                             <div className="font-black text-xs mt-0.5 text-slate-700">
//                                                 {Number(departments[1]?.total_clicks).toLocaleString()}
//                                             </div>
//                                         </div>
//                                         {/* แท่นโพเดียม */}
//                                         <div className="w-full h-25 rounded-t-xl bg-gradient-to-t from-slate-400 to-slate-200 flex flex-col items-center justify-center shadow-inner gap-1">
//                                             <div className="relative w-18 h-18 rounded-full overflow-hidden border border-white/40 shadow-sm bg-white/50">
//                                                 <Image
//                                                     src={departments[1]?.ImageCat}
//                                                     fill
//                                                     quality={70}
//                                                     sizes="72px"
//                                                     alt={departments[1]?.ImageCat}
//                                                     className="object-cover  "
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Rank 1 */}
//                                     <div className="flex flex-col items-center w-28">
//                                         <div className="text-3xl animate-bounce mb-0.5">👑</div>
//                                         <div className="mb-1.5 bg-gradient-to-r from-yellow-400 to-amber-300 text-black rounded-xl p-2 w-full text-center shadow-md border border-yellow-300">
//                                             <div className="font-black text-xs line-clamp-1">
//                                                 {departments[0]?.department_name}
//                                             </div>
//                                             <div className="text-base font-black mt-0.5 text-amber-950">
//                                                 {Number(departments[0]?.total_clicks).toLocaleString()}
//                                             </div>
//                                         </div>
//                                         {/* แท่นโพเดียม */}
//                                         <div className="w-full h-30 rounded-t-xl bg-gradient-to-t from-amber-500 via-yellow-400 to-yellow-300 flex flex-col items-center justify-center shadow-md gap-1">
//                                             {/* แท่นสูง สามารถใช้รูปขนาด w-9 h-9 ได้อย่างเด่นชัด */}
//                                             <div className="relative w-18 h-18 rounded-full overflow-hidden border-2 border-white/60 shadow-md bg-white/50">
//                                                 <Image
//                                                     src={departments[0]?.ImageCat}
//                                                     fill
//                                                     quality={70}
//                                                     sizes="72px"
//                                                     alt={departments[0]?.ImageCat}
//                                                     className="object-cover"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Rank 3 */}
//                                     <div className="flex flex-col items-center w-24">
//                                         <div className="mb-1.5 bg-amber-50 text-amber-900 rounded-xl p-1.5 w-full text-center shadow-sm border border-amber-200">
//                                             <div className="font-bold text-[11px] line-clamp-1">
//                                                 {departments[2]?.department_name}
//                                             </div>
//                                             <div className="font-black text-xs mt-0.5 text-amber-800">
//                                                 {Number(departments[2]?.total_clicks).toLocaleString()}
//                                             </div>
//                                         </div>
//                                         {/* แท่นโพเดียม */}
//                                         <div className="w-full h-20 rounded-t-xl bg-gradient-to-t from-amber-700 to-amber-500 flex flex-col items-center justify-center shadow-inner gap-0.5">
//                                             {/* แท่นเตี้ยมาก (h-11) เปลี่ยนมาใช้วิธีจัดเรียงแนวนอนหรือลดขนาดรูปเหลือ w-6 h-6 เพื่อไม่ให้หลุดเฟรม */}
//                                             <div className="flex items-center justify-center gap-1.5">
//                                                 <div className="relative w-18 h-18 rounded-full overflow-hidden border border-white/30 shadow-sm bg-white/50">
//                                                     <Image
//                                                         src={departments[2]?.ImageCat}
//                                                         quality={70}
//                                                         fill
//                                                         sizes="72px"
//                                                         alt={departments[2]?.ImageCat}
//                                                         className="object-cover"
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </div>
//                         )}

//                         {/* Remaining Rankings */}
//                         <div className="space-y-2">
//                             <div className="flex items-center gap-2 px-1">
//                                 <div className="h-[1px] flex-1 bg-gray-300" />
//                                 <span className="text-zinc-400 text-[10px] font-medium tracking-wider">
//                                     คณะ และ วิทยาลัยอื่นๆ
//                                 </span>
//                                 <div className="h-[1px] flex-1 bg-gray-300" />
//                             </div>

//                             {departments.slice(3).map((dept, index) => {
//                                 const rank = index + 4;
//                                 return (
//                                     <div
//                                         key={dept.id}
//                                         className="group rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-all shadow-sm"
//                                     >
//                                         {/* ปรับลด padding ลงเหลือ py-1.5 px-3 */}
//                                         <div className="flex items-center justify-between py-1.5 px-3">
//                                             <div className="flex items-center gap-3 min-w-0">
//                                                 {/* ปรับวงกลมตัวเลขให้เล็กลงเหลือ w-8 h-8 */}
//                                                 <div className="w-10 h-10 relative overflow-hidden rounded-full bg-zinc-100 flex items-center justify-center font-bold text-sm text-zinc-700 shrink-0 border border-zinc-200">
//                                                     <Image
//                                                         src={dept?.ImageCat}
//                                                         quality={70}
//                                                         fill
//                                                          sizes="40px"
//                                                         alt={dept?.ImageCat}
//                                                         className="object-cover"
//                                                     />
//                                                 </div>

//                                                 <div className="min-w-0">
//                                                     <div className="font-bold text-xs text-zinc-800 truncate">
//                                                         {dept.department_name}
//                                                     </div>
//                                                     <div className="text-[10px] uppercase text-zinc-400 truncate">
//                                                         {dept.department_key}
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             <div className="text-right shrink-0">
//                                                 {/* ปรับสีคะแนนและขนาดฟอนต์ให้ดูนุ่มนวลขึ้น */}
//                                                 <div className="text-lg font-black text-emerald-600">
//                                                     {Number(dept.total_clicks).toLocaleString()}
//                                                 </div>
//                                                 <div className="text-[9px] text-zinc-400 font-medium">
//                                                     คะแนน
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 );
//                             })}
//                         </div>
//                     </>
//                 )}
//             </div>
//         </div>


//     );
// }

'use client'

import { DEPARTMENTS_CONFIG } from "@/app/games/pop-cat/page";
import { post } from "@/app/Post";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

// ===== TYPE ใหม่จาก API /top-departments =====
interface Department {
  department_key: string;
  total_clicks: number;
  student_name: string
  student_id: number
}



export default function Popcar() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ===== FETCH TOP DEPARTMENTS =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${post}/popcar/top-departments`);

        if (response.data.status) {
          setDepartments(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // ===== MAP CONFIG (ชื่อ + รูป) =====
  const enrichedDepartments = useMemo(() => {
    return departments.map((d) => {
      const config = DEPARTMENTS_CONFIG[d.department_key];

      return {
        ...d,
        name: config?.name ?? d.department_key,
        image: config?.catImages?.open ?? "",
      };
    });
  }, [departments]);

  return (
    <div className="absolute inset-0 flex flex-col items-center md:justify-center w-full h-screen">
      <div className="w-[750px] flex flex-col h-screen mt-10 bg-gray-50 p-3 rounded-t-2xl border border-gray-200">

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-zinc-500 text-sm font-bold">กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        ) : (
          <>
            {/* ================= TOP 3 ================= */}
            {enrichedDepartments.length >= 3 && (
              <div className="mb-4">
                <div className="flex items-end justify-center  gap-2">

                  {/* ===== RANK 2 (SILVER สดใส) ===== */}
                  <div className="flex flex-col items-center w-45">
                    <p className="text-[15px] font-semibold">ที่ 2</p>
                    <div className="mb-1.5 bg-slate-200 rounded-xl p-2 w-full text-center border-2 border-slate-300 shadow-sm">
                      <div className="font-bold text-[16px] mb-4 leading-tight text-slate-800 whitespace-normal line-clamp-2">
                        {enrichedDepartments[1]?.name}
                      </div>
                    
                      {/* Student Tag */}
                      <div className="text-[14px] text-left  text-white bg-slate-600 rounded px-1 py-0.5 mt-1 truncate">
                        <p className=" truncate">N : {enrichedDepartments[1]?.student_name}</p>
                        <p>รหัส : {enrichedDepartments[1]?.student_id || '-'}</p>
                      </div>
                    </div>

                    <div className="w-full h-45 flex-col rounded-t-xl bg-gradient-to-t from-slate-500 to-slate-300 flex items-center justify-center border-t border-x border-slate-400">
                      <div className="relative w-30 h-30 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={enrichedDepartments[1]?.image}
                          fill
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      <div className="font-black text-lg text-white mt-1">
                        {Number(enrichedDepartments[1]?.total_clicks).toLocaleString()} คะเเนน
                      </div>
                    </div>
                  </div>

                  {/* ===== RANK 1 (GOLD จัดจ้าน) ===== */}
                  <div className="flex flex-col items-center w-55">
                    <div className="text-3xl animate-bounce mb-1">👑</div>

                    <div className="mb-1.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-xl p-2.5 w-full text-center border-2 border-yellow-500 shadow-md">
                      <div className="font-black text-[16px] mb-4 leading-tight text-amber-950 whitespace-normal line-clamp-2">
                        {enrichedDepartments[0]?.name}
                      </div>
                      
                      {/* Student Tag */}
                      <div className="text-[14px] text-left  text-white bg-yellow-700 rounded px-1 py-0.5 mt-1 truncate border border-yellow-300">
                        <p className=" truncate">N : {enrichedDepartments[0]?.student_name}</p>
                        <p>รหัส : {enrichedDepartments[0]?.student_id || '-'}</p>
                      </div>
                    </div>

                    <div className="w-full h-50 flex-col rounded-t-xl bg-gradient-to-t from-yellow-500 via-amber-400 to-yellow-300 flex items-center justify-center border-t border-x border-yellow-400">
                      <div className="relative w-35 h-35 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <Image
                          src={enrichedDepartments[0]?.image}
                          fill
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      <div className="font-black text-lg text-white mt-1">
                        {Number(enrichedDepartments[0]?.total_clicks).toLocaleString()} คะเเนน
                      </div>
                    </div>
                  </div>

                  {/* ===== RANK 3 (BRONZE ส้มสด) ===== */}
                  <div className="flex flex-col items-center w-40">
                    <p className="text-[15px] font-semibold">ที่ 3</p>
                    <div className="mb-1.5 bg-amber-100 rounded-xl p-2 w-full text-center border-2 border-amber-200 shadow-sm">
                      <div className="font-bold text-[15px] mb-4 leading-tight text-amber-900 whitespace-normal line-clamp-2">
                        {enrichedDepartments[2]?.name}
                      </div>

                      {/* Student Tag */}
                      <div className="text-[14px] text-left  text-white bg-amber-700 rounded px-1 py-0.5 mt-1 truncate">
                        {enrichedDepartments[2]?.student_name}
                        <p>รหัส : {enrichedDepartments[2]?.student_id || '-'}</p>
                      </div>
                    </div>

                    <div className="w-full h-40 flex flex-col rounded-t-xl bg-gradient-to-t from-amber-700 via-orange-500 to-amber-400  items-center justify-center border-t border-x border-amber-600">
                      <div className="relative w-25 h-25 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <Image
                          src={enrichedDepartments[2]?.image}
                          fill
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      <div className="font-black text-lg text-white mt-1">
                        {Number(enrichedDepartments[2]?.total_clicks).toLocaleString()} คะเเนน
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ================= REST ================= */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <div className="h-[2px] flex-1 bg-gray-300" />
                <span className="text-zinc-500 text-[16px] font-bold">
                  คณะอื่นๆ
                </span>
                <div className="h-[2px] flex-1 bg-gray-300" />
              </div>

              {enrichedDepartments.slice(3).map((dept, index) => {
                const rank = index + 4;

                return (
                  <div
                    key={dept.department_key}
                    className="rounded-xl border-2 border-gray-200 bg-white p-2.5 flex justify-between items-center shadow-sm hover:border-gray-400 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* รูปโปรไฟล์ */}
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-300 shadow-inner">
                        <Image
                          src={dept.image}
                          fill
                          alt=""
                          className="object-cover"
                        />
                      </div>

                      {/* รายละเอียดข้อความ */}
                      <div>
                        <div className="font-bold text-[17px] text-sm text-gray-800">
                          <p>ที่{rank} {dept.name}</p>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">

                          {/* แท็กนักศึกษา สีสดชัดเจน */}
                          <span className="text-[14px] text-left  px-1.5 py-0.5 text-gray-500  ">
                            <p>N : {dept.student_name} รหัส :{dept.student_id}</p>

                          </span>
                        </div>
                      </div>
                    </div>

                    {/* คะแนนคลิก สีเขียวเข้มสด */}
                    <div className="font-black text-base text-emerald-600 ">
                      {Number(dept.total_clicks).toLocaleString()} คะเนน
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