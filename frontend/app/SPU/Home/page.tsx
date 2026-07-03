import { AnimatePresence } from "framer-motion";
import BK from "./page/Bk";
import Cdweb from "./page/Cdweb";
import Message from "./page/Message";
import Popcar from "./page/Popcar";
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

            <div className="absolute inset-0 z-20 pointer-events-nones">
                <Message />
            </div>

            <div className="absolute inset-0 z-40 pointer-events-none">
                <AnimatePresence>
                    <Scan />
                </AnimatePresence>
            </div>

            <div className="absolute inset-0 z-30 pointer-events-none">
                <Popcar />
            </div>
        </div>
    )
}

