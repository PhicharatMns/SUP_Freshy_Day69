import { div } from "framer-motion/client"
import Image from "next/image"

const data = [
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/456.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/456.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'

    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/456.png',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/456.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/456.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/456.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        user: 'เบียร์',
        tpye: 'เทคโน',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        user: 'เบียร์',
        tpye: 'เทคโน',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        user: 'เบียร์',
        tpye: 'เทคโน',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        user: 'เบียร์',
        tpye: 'เทคโน',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        user: 'เบียร์',
        tpye: 'เทคโน',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        user: 'เบียร์',
        tpye: 'เทคโน',
        discription: '555555555555555555555555555555555555555555555555555555555555555555555555555555'
    },
    {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    }, {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    },   {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    },   {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    },   {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    },   {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    },   {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: '1'
    },  {
        Image: 'https://sdqlpckrrynnekozzqfg.supabase.co/storage/v1/object/public/publicImage/120.png',
        tpye: 'เทคโน',
        user: 'เบียร์',
        discription: ''
    },

]

export default function Message() {
    return (
        <div className="relative w-full flex justify-end h-screen overflow-hidden ">
            <div className="flex flex-col gap-2 p-2 h-full overflow-y-auto pr-3 [&::-webkit-scrollbar]:hidden">
                {data.slice(0, 25).map((e, i) => {
                    return (
                        <div
                            className="flex gap-5 border  w-[430px] p-3 bg-slate-50 rounded-[15px] border-gray-300"
                            key={i}>
                            <div className="w-12 h-12 relative rounded-full overflow-hidden">
                                <Image
                                    fill
                                    src={`${e.Image}`}
                                    alt={e.discription}
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col min-w-0 flex-1">
                                <div className="flex gap-2 truncate font-semibold text-slate-800">
                                    <p className="">
                                        N : {e.user}
                                    </p>
                                    <p>{e.tpye}</p>

                                </div>
                                <p className={`line-clamp-2 break-all text-sm leading-relaxed ${e.discription === '' ? 'text-pink-500' : 'text-slate-600'}`}>
                                    <span className={'text-slate-400 font-semibold'}>ถามว่า : </span>
                                    {e.discription || "ให้กําลังใจ สโม"}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}