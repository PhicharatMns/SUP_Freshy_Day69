"use client";

import { useState, useEffect } from "react";
import { post } from "@/app/Post";
import Image from "next/image";

interface IGData {
  id: number;
  name: string;
  ig_account?: string;
  image_url?: string;
  quote_text?: string;
  type?: string;
}

export default function AdminControlPanel() {
  const [data, setData] = useState<IGData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 🛠️ ตรวจสอบความถูกต้องของรูปภาพและฟอลแบ็ก
  const normalizeImageUrl = (url: string | null | undefined) => {
    if (!url) return 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/popcar/DEK69.webp';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      if (url.includes('894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69')) {
        return url.replace('https://894df2ee46e1279e8499573d3c22949b.r2.cloudflarestorage.com/sup69', 'https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev');
      }
      return url;
    }
    if (url.startsWith('Image69/') || url.startsWith('IG_Images/')) {
      return `https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/${url}`;
    }
    return url.startsWith('/') ? url : `/${url}`;
  };

  // ดึงรายการโพสต์ทั้งหมด
  const fetchPosts = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const res = await fetch(`${post}/ig_my/select-ig?t=${Date.now()}`);
      const result = await res.json();
      if (result.success && result.data) {
        setData(result.data);
      }
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  // ดำเนินการลบโพสต์
  const handleDelete = async (id: number, name: string) => {
    const confirmDelete = window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบโพสต์ของ "${name}" ออกจากหน้าจอถาวร?`);
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${post}/ig_my/delete-ig/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.success) {
        alert("ลบข้อมูลสำเร็จแล้ว!");
        // โหลดข้อมูลล่าสุดมาอัปเดต UI
        fetchPosts(false);
      } else {
        alert(`เกิดข้อผิดพลาด: ${result.message}`);
      }
    } catch (err) {
      console.error("Delete request failed", err);
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์เพื่อลบรูปภาพได้");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    // โหลดครั้งแรกสุดพร้อมแสดงตัวหมุนโหลด
    fetchPosts(true);

    // ทำการดึงข้อมูลอัปเดตแบบเงียบๆ เบื้องหลัง (Silent Polling) ทุกๆ 3 วินาที เพื่อให้ขึ้นข้อมูลใหม่เรียลไทม์
    const interval = setInterval(() => {
      fetchPosts(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            🛡️ Admin Control Panel <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Secret Gate</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">คัดกรองและลบโพสต์ IG ที่ไม่เหมาะสมสำหรับจอใหญ่มหาวิทยาลัย</p>
        </div>
        <button
          onClick={() => fetchPosts(true)}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "🔄 รีเฟรชรายการ"
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        {loading && data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-slate-400 text-sm font-medium">กำลังโหลดรูปภาพและโพสต์ล่าสุด...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
            <span className="text-4xl">📸</span>
            <h3 className="text-lg font-bold text-white mt-4">ไม่มีโพสต์ IG ในระบบ</h3>
            <p className="text-slate-400 text-sm mt-1">ยังไม่มีข้อมูลส่งเข้ามาร่วมกิจกรรมในขณะนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((post) => (
              <div
                key={post.id}
                className="flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 backdrop-blur-sm shadow-xl transition-all hover:border-slate-700"
              >
                {/* รูปผู้ใช้งาน */}
                <div className="relative w-full aspect-square bg-slate-950 border-b border-slate-800">
                  <Image
                    fill
                    sizes="(max-width: 640px) 100vw, 250px"
                    src={normalizeImageUrl(post.image_url)}
                    alt={post.name}
                    className="object-cover"
                  />
                  {post.type && (
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-indigo-500/90 text-white shadow-md">
                      {post.type}
                    </span>
                  )}
                </div>

                {/* รายละเอียด */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-white font-bold text-base truncate">{post.name || "Anonymous"}</h3>
                    <p className="text-indigo-400 font-semibold text-sm truncate">
                      {post.ig_account ? (post.ig_account.startsWith("@") ? post.ig_account : `@${post.ig_account}`) : "@no_account"}
                    </p>
                    {post.quote_text && (
                      <p className="text-slate-400 text-xs italic line-clamp-3 leading-relaxed pt-2 border-t border-slate-800/60">
                        “ {post.quote_text} ”
                      </p>
                    )}
                  </div>

                  {/* ปุ่มลบ */}
                  <button
                    onClick={() => handleDelete(post.id, post.name)}
                    disabled={deletingId === post.id}
                    className="w-full py-2.5 rounded-xl bg-red-600/90 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  >
                    {deletingId === post.id ? (
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        ลบโพสต์ถาวร
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
