'use client'

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { post } from "@/app/Post";

interface IGData {
    id: number;
    name: string;
    quote_text: string;
    image_url: string | null;
    ig_account: string;
    popup: boolean;
}

export default function Scan() {

    const [current, setCurrent] = useState<IGData | null>(null);
    const [show, setShow] = useState(false);
    const [qr, setQr] = useState("");

    const runningRef = useRef(false);

    useEffect(() => {

        const getPopup = async () => {

            if (runningRef.current) return;

            try {

                const res = await fetch(`${post}/ig_my/next-popup`);
                const result = await res.json();

                if (!result.success) return;
                if (!result.data) return;

                runningRef.current = true;

                setCurrent(result.data);
                setShow(true);

            } catch (error) {
                console.error(error);
            }
        };

        getPopup();

        const interval = setInterval(getPopup, 15000);

        return () => clearInterval(interval);

    }, []);

    useEffect(() => {

        if (!show) return;

        const timer = setTimeout(() => {

            setShow(false);
            setCurrent(null);
            setQr("");

            runningRef.current = false;

        }, 10000);

        return () => clearTimeout(timer);

    }, [show]);

    // ================= QR =================
    useEffect(() => {

        if (!current?.ig_account) return;

        const generateQR = async () => {

            try {

                const username = current.ig_account.replace("@", "");

                const url = await QRCode.toDataURL(
                    `https://www.instagram.com/${username}`
                );

                setQr(url);

            } catch (error) {
                console.error(error);
            }
        };

        generateQR();

    }, [current]);

    if (!show || !current) return null;

    return (
        <div className="fixed inset-0 z-[99999] bg-black/60 backdrop-blur-lg">

            <div className="flex flex-col items-center justify-center h-full">

                <div
                    className={`grid gap-10 ${current.ig_account?.trim() ? 'grid-cols-2' : 'grid-cols-1'
                        }`}
                >

                    <div className="relative w-[560px] h-[560px] rounded-[15px] overflow-hidden">

                        <Image
                            fill
                            sizes="(max-width: 768px) 50vw"
                            quality={70}
                            src={
                                current.image_url ||
                                "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/spuprofile.jpg"
                            }
                            alt={current.name}
                            className="object-cover"
                            priority={true}
                        />

                    </div>

                    {qr && current.ig_account.trim() !== '' && (
                        <div className="relative w-[560px] h-[560px] rounded-[15px] overflow-hidden bg-white p-5">
                            <Image
                                fill
                                src={qr}
                                alt="Instagram QR"
                            />
                        </div>
                    )}

                </div>

                <h1 className="text-white text-3xl font-bold mt-6">
                    {current.name || "เด็กศรีปทุมท่านหนึ่ง"}
                </h1>

                <p className="text-white text-center mt-4 max-w-xl text-lg">
                    {current.quote_text}
                </p>

            </div>

        </div>
    );
}