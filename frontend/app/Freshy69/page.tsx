'use client'

import Image from "next/image";
import BK from "../SPU/Home/page/Bk";
import Cdweb from "../SPU/Home/page/Cdweb";
import Formsup from "./formsup";
import { useState } from "react";

export interface propspopup {
    popupFormsup: boolean
}

export default function PageFreshy69() {

    const [popup, setpopup] = useState({
        popupFormsup: true
    })

    return (
        <div className="h-screen">
            <div className='relative '>
                <div className="absolute inset-0">
                    <BK />
                </div>
                {popup.popupFormsup && (
                    <div className='relative z-50 '>
                        <Formsup
                            setpopup={setpopup}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}