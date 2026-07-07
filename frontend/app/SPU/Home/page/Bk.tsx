import Image from "next/image";

const images = {
  desktop:
    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/PPPPPPPP.webp",
  ipad:
    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/Ipadd.webp",
  mobile:
    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/msBK.webp",
  item2:
    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/2-removebg-preview.png",
  item4:
    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/4-removebg-preview.png",
  item5:
    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/5-removebg-preview.png",
  itemPNG:
    "https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/PNG___1_-removebg-preview.png",
};

export default function BK() {
  return (
    <div className="w-full h-screen">

      {/* Desktop */}
      <div className="relative hidden lg:block w-full h-full">

        <Image
          src={images.desktop}
          alt="background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />


        {/* รูป 2 */}
        <div className="absolute top-6 right-6 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={images.item2}
            alt="item2"
            fill
            sizes="(max-width: 1024px) 288px, 320px"
            className="object-contain"
          />
        </div>


        {/* รูป 4 */}
        <div className="absolute bottom-4 left-40 w-80 h-80 lg:w-96 lg:h-96 animate-spin">
          <Image
            src={images.item4}
            alt="item4"
            fill
            sizes="(max-width: 1024px) 320px, 384px"
            className="object-contain"
          />
        </div>


        {/* รูป 5 */}
        <div className="absolute top-4 left-40 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={images.item5}
            alt="item5"
            fill
            sizes="(max-width: 1024px) 288px, 320px"
            className="object-contain"
          />
        </div>


        {/* PNG */}
        <div className="absolute bottom-4 right-7 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={images.itemPNG}
            alt="item png"
            fill
            sizes="(max-width: 1024px) 288px, 320px"
            className="object-contain"
          />
        </div>

      </div>



      {/* Tablet */}
      <div className="relative hidden md:block lg:hidden w-full h-full">

        <Image
          src={images.ipad}
          alt="tablet background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

      </div>



      {/* Mobile */}
      <div className="relative block md:hidden w-full h-full">

        <Image
          src={images.mobile}
          alt="mobile background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />

      </div>

    </div>
  );
}