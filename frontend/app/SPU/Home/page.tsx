

// "use client";
// import { useEffect, useState } from 'react';
// import QRCode from 'qrcode';

// export default function QRGenerator() {
//     const [src, setSrc] = useState('');

//     useEffect(() => {
//         const generateQR = async () => {
//             try {
//                 const url = await QRCode.toDataURL('https://www.instagram.com/ntyz_lifz/');
//                 setSrc(url);
//             } catch (err) {
//                 console.error("เกิดข้อผิดพลาดในการสร้าง QR Code:", err);
//             }
//         };

//         generateQR();
//     }, []);
//     return (
//         <div>
//             {src ? (
//                 <img src={src} alt="Instagram QR Code" width={200} height={200} />
//             ) : (
//                 <p>กำลังสร้าง QR Code...</p>
//             )}
//         </div>
//     );
// }

import Image from "next/image";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb";
import Message from "./page/Message";

export default function HomePage() {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 z-0">
                <BK />
            </div>

            <div className="absolute inset-0 z-10">
                <Cdweb />
            </div>

            <div className="absolute inset-0 z-20 ">
                <Message />
            </div>
        </div>
    )
}

