'use client'

import BK from "../SPU/Home/page/Bk";
import Formsup from "./formsup";
export default function PageFreshy69() {

    return (
        <div className="h-screen">
            <div className='relative '>
                <div className="absolute inset-0">
                    <BK />
                </div>
                <div className='relative z-60 '>
                    <Formsup
                    />
                </div>
            </div>
        </div>
    )
}