'use client'

import { post } from "@/app/Post";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { DEPARTMENTS_CONFIG } from "@/app/games/pop-cat/page";

// ===== TYPE จาก API /leaderboard =====
interface LeaderboardItem {
  department_key: string;
  department_name: string;
  total_clicks: number;
  image_url: string | null;
  top_student_id: string | null;
  top_student_name: string | null;
  top_student_clicks: number;
}

// ===== Enriched type รวมรูปจาก DEPARTMENTS_CONFIG =====
interface EnrichedItem extends LeaderboardItem {
  catImage: string;
  displayName: string;
}

export default function Popcar() {
  const [data, setData] = useState<LeaderboardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ===== FETCH LEADERBOARD (ทุกคณะ + top player) =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${post}/popcar/leaderboard?t=${Date.now()}`);
        const json = await res.json();
        if (json.status && json.data) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  // ===== MAP รูปจาก DEPARTMENTS_CONFIG =====
  const enriched: EnrichedItem[] = useMemo(() => {
    return data.map((d) => {
      const config = DEPARTMENTS_CONFIG[d.department_key];
      return {
        ...d,
        catImage: config?.catImages?.open ?? d.image_url ?? "",
        displayName: config?.name ?? d.department_name,
      };
    });
  }, [data]);

  const top3 = enriched.slice(0, 3);
  const rest = enriched.slice(3);

  // ===== PODIUM CARD COMPONENT =====
  const PodiumCard = ({
    item,
    rank,
    height,
    gradient,
    borderColor,
    imgSize,
    crown,
  }: {
    item: EnrichedItem;
    rank: number;
    height: string;
    gradient: string;
    borderColor: string;
    imgSize: string;
    crown?: boolean;
  }) => (
    <div className="flex flex-col items-center" style={{ width: rank === 1 ? 220 : rank === 2 ? 180 : 160 }}>
      {crown && <div className="text-3xl animate-bounce mb-1">👑</div>}
      {!crown && <p className="text-[15px] font-semibold mb-1">ที่ {rank}</p>}

      {/* Info box */}
      <div className={`mb-1.5 rounded-xl p-2 w-full text-center border-2 shadow-md ${
        rank === 1
          ? "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 border-yellow-500"
          : rank === 2
          ? "bg-slate-200 border-slate-300"
          : "bg-amber-100 border-amber-200"
      }`}>
        <div className={`font-bold text-[14px] mb-2 leading-tight whitespace-normal line-clamp-2 ${
          rank === 1 ? "text-amber-950 font-black" : rank === 2 ? "text-slate-800" : "text-amber-900"
        }`}>
          {item.displayName}
        </div>
        {/* top player */}
        <div className={`text-[12px] text-left text-white rounded px-1 py-0.5 truncate ${
          rank === 1 ? "bg-yellow-700 border border-yellow-300" : rank === 2 ? "bg-slate-600" : "bg-amber-700"
        }`}>
          <p className="truncate">N : {item.top_student_name || "-"}</p>
          <p>รหัส : 69{item.top_student_id || "-"}</p>
        </div>
      </div>

      {/* Podium bar */}
      <div className={`w-full ${height} flex flex-col rounded-t-xl ${gradient} items-center justify-center border-t border-x ${borderColor}`}>
        {item.catImage ? (
          <div className={`relative ${imgSize} rounded-full overflow-hidden border-2 border-white shadow-md`}>
            <Image src={item.catImage} fill alt={item.displayName} className="object-cover" />
          </div>
        ) : null}
        <div className="font-black text-base text-white mt-1">
          {Number(item.top_student_clicks).toLocaleString()} คะแนน
        </div>
      </div>
    </div>
  );

  return (
    <div className="absolute bg-black/60 backdrop-blur-lg inset-0 flex flex-col items-center md:justify-center w-full h-screen">
      <div className="w-[780px] flex flex-col h-screen mt-10 bg-gray-50 p-3 rounded-t-2xl border border-gray-200 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-zinc-500 text-sm font-bold">กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        ) : enriched.length === 0 ? (
          <div className="flex justify-center items-center py-20 text-zinc-400 text-sm font-bold">
            ยังไม่มีข้อมูลคะแนนในระบบ
          </div>
        ) : (
          <>
            {/* ================= TOP 3 PODIUM ================= */}
            {top3.length >= 1 && (
              <div className="mb-4">
                <div className="flex items-end justify-center gap-2">

                  {/* Rank 2 */}
                  {top3[1] && (
                    <PodiumCard
                      item={top3[1]}
                      rank={2}
                      height="h-44"
                      gradient="bg-gradient-to-t from-slate-500 to-slate-300"
                      borderColor="border-slate-400"
                      imgSize="w-28 h-28"
                    />
                  )}

                  {/* Rank 1 */}
                  {top3[0] && (
                    <PodiumCard
                      item={top3[0]}
                      rank={1}
                      height="h-52"
                      gradient="bg-gradient-to-t from-yellow-500 via-amber-400 to-yellow-300"
                      borderColor="border-yellow-400"
                      imgSize="w-32 h-32"
                      crown={true}
                    />
                  )}

                  {/* Rank 3 */}
                  {top3[2] && (
                    <PodiumCard
                      item={top3[2]}
                      rank={3}
                      height="h-36"
                      gradient="bg-gradient-to-t from-amber-700 via-orange-500 to-amber-400"
                      borderColor="border-amber-600"
                      imgSize="w-24 h-24"
                    />
                  )}

                </div>
              </div>
            )}

            {/* ================= REST (อันดับที่ 4+) ================= */}
            {rest.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <div className="h-[2px] flex-1 bg-gray-300" />
                  <span className="text-zinc-500 text-[14px] font-bold">คณะอื่นๆ</span>
                  <div className="h-[2px] flex-1 bg-gray-300" />
                </div>

                {rest.map((dept, index) => {
                  const rank = index + 4;
                  return (
                    <div
                      key={dept.department_key}
                      className="rounded-xl border-2 border-gray-200 bg-white p-2.5 flex justify-between items-center shadow-sm hover:border-gray-400 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* รูปสัตว์คณะ */}
                        {dept.catImage ? (
                          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-300 shadow-inner flex-shrink-0">
                            <Image src={dept.catImage} fill alt={dept.displayName} className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
                            {rank}
                          </div>
                        )}

                        {/* ข้อมูล */}
                        <div>
                          <div className="font-bold text-[15px] text-gray-800">
                            ที่ {rank} {dept.displayName}
                          </div>
                          <div className="text-[12px] text-gray-500 mt-0.5">
                            N : {dept.top_student_name || "-"} &nbsp;|&nbsp; รหัส : {dept.top_student_id || "-"}
                          </div>
                        </div>
                      </div>

                      {/* คะแนนรายบุคคล */}
                      <div className="font-black text-base text-emerald-600 flex-shrink-0">
                        {Number(dept.top_student_clicks).toLocaleString()} คะแนน
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}