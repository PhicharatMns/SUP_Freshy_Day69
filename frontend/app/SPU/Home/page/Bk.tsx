import Image from "next/image";

export default function BK() {
  return (
    <div className="md:w-full h-screen">
      <div className="relative md:block hidden w-full h-full">
        <Image
          src={
            "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/PPPPPPPP.webp"
          }
          alt="bk"
          fill
          className="object-cover"
        />

        {/* รูป 2 มุมบนขวา หมุนวนช้าๆ */}
        <div className="absolute top-6 right-6 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={
              "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/2-removebg-preview.png"
            }
            alt="bk"
            fill
            className="object-contain"
          />
        </div>

        {/* รูป 4 มุมซ้ายล่าง */}
        <div className="absolute bottom-4 left-40 w-80 h-80 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-spin">
          <Image
            src={
              "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/4-removebg-preview.png"
            }
            alt="bk"
            fill
            className="object-contain"
          />
        </div>

        {/* รูป 5 */}
        <div className="absolute top-4 left-40 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={
              "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/5-removebg-preview.png"
            }
            alt="bk"
            fill
            className="object-contain"
          />
        </div>

        {/* รูป PNG (1) */}
        <div className="absolute bottom-4 right-7 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={
              "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/PNG___1_-removebg-preview.png"
            }
            alt="bk"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative md:block lg:hidden hidden w-full h-full">
        <Image
          src={
            "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/Ipadd.webp"
          }
          alt="bk"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative md:hidden block w-full h-full">
        <Image
          src={
            "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/msBK.webp"
          }
          alt="bk"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}