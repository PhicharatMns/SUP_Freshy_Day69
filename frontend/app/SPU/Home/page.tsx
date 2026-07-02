import Image from "next/image";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb";
import Message from "./page/Message";
import Scan from "./page/scan";

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

            <div className="absolute inset-0 z-20 ">
                <Scan />
            </div>
        </div>
    )
}

