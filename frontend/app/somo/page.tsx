"use client";

import Link from "next/link";

export default function Somo() {
  return (
    <div className="flex max-w-sm flex-col gap-4 rounded-2xl bg-white p-6 shadow-xl">
      <h2 className="text-lg font-bold">⚙️ ตัวควบคุม Pop Cat</h2>
      <p className="text-sm text-slate-600">
        ระบบเปิด/ปิดเกมและเปิด/ปิดการดู score ถูกย้ายไปที่หน้า Admin Control Panel แล้ว
      </p>
      <Link
        href="/admin-secret-69"
        className="rounded-xl bg-indigo-600 px-5 py-4 text-center font-bold text-white transition hover:bg-indigo-500"
      >
        ไปหน้า Admin Control Panel
      </Link>
    </div>
  );
}