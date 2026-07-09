import Image from "next/image";

export default function BK() {
  return (
    <div className="md:w-full h-screen">
      <div className="relative md:block hidden w-full h-full">
        <Image
          src={
            "https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/PPPPPPPP.webp"
          }
          alt="bk"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          className="object-cover"
        />

        {/* รูป 2 มุมบนขวา หมุนวนช้าๆ */}
        <div className="absolute top-6 right-6 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={
              "https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/2-removebg-preview.png"
            }
            alt="bk"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        {/* รูป 4 มุมซ้ายล่าง */}
        <div className="absolute bottom-4 left-40 w-80 h-80 md:w-80 md:h-80 lg:w-96 lg:h-96 animate-spin">
          <Image
            src={
              "https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/4-removebg-preview.png"
            }
            alt="bk"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        {/* รูป 5 */}
        <div className="absolute top-4 left-40 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={
              "https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/5-removebg-preview%20(2).png"
            }
            alt="bk"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>
        {/* https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/6-removebg-preview.webp */}
        {/* losomo */}
        <div className="absolute flex justify-center items-start w-full h-fit  ">
          <div className=" ">
            <Image
              src="https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/5-removebg-preview-_1_.webp"
              alt="bk"
              width={650}
              height={400}
              priority
              sizes="(max-width: 768px) 100vw"
              className="object-contain "
            />
          </div>
        </div>



        {/* รูป PNG (1) */}
        <div className="absolute bottom-4 right-7 w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-spin-slow">
          <Image
            src={
              "https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/PNG___1_-removebg-preview%20(1).png"
            }
            alt="bk"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
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
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          className="object-cover"
        />
      </div>

      <div className="relative md:hidden block w-full h-full">
        <Image
          src={
            "https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/msBK%20(1).webp"
          }
          alt="bk"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={true}
          className="object-cover"
        />
        <div className="absolute flex justify-center items-start w-full h-fit  ">
          <div className="">
            <Image
              src="https://pub-48170382f78a40c58965b28eaa08b4c6.r2.dev/bk/6-removebg-preview.webp"
              alt="bk"
              width={600}
              height={400}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}