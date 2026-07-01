'use client'

import { useEffect, useState } from "react";
import QRCode from 'qrcode';
import Image from "next/image";

export default function Cdweb() {

    const [src, setSrc] = useState('');

    useEffect(() => {
        const generateQR = async () => {
            try {
                const url = await QRCode.toDataURL('https://www.instagram.com/ntyz_lifz/');
                setSrc(url);
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการสร้าง QR Code:", err);
            }
        };

        generateQR();
    }, []);

    return (
        <div>
            <div className=" absolute inset-0 flex items-center justify-center w-full h-screen z-50">
                {src && (
                    <Image
                        src={src}
                        alt="Instagram QR"
                        width={350}
                        height={350}
                    />
                )}
            </div>
            {/* รีฟทําตรงนี้ */}
            <div className='relative'>
                
            </div>
        </div>
    )
}