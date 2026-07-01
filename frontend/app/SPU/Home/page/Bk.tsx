import Image from "next/image";

export default function BK() {
    return (
        <div className=" md:w-full h-screen">
            <div className="relative lg:block hidden w-full  h-full ">
                <Image
                    src={'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/Ipad1180ep.webp'}

                    alt="bk"
                    fill
                    className="object-cover"
                />
                
            </div>

            <div className="relative md:block lg:hidden hidden w-full  h-full ">
                <Image
                    src={'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/IpadSize.webp'}
                    alt="bk"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="relative md:hidden block w-full  h-full ">
                <Image
                    src={'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/msBK.webp'}
                    alt="bk"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}