import Image from "next/image";

export default function PageFreshy69() {
    return (
        <div className=" md:w-full h-screen">
            <div className="relative w-full  h-full ">
                <Image
                    src={'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/bk.webp'}
                    alt="bk"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}