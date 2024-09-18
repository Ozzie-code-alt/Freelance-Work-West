'use client';
import QrcodePage from '@/components/qrcodePage';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-collision';
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  return (
    <BackgroundBeamsWithCollision>
      <div className='h-screen w-screen bg-gradient-to-b  from-[rgb(2,0,36)] to-[rgba(86,90,112,0.95)] flex flex-col justify-center items-center'>
        <QrcodePage />

        <div className=' rounded-xl border-black z-40 bg-black/50  hover:cursor-pointer mt-10 px-20 py-10'>
          <button
            className=' text-white  hover:text-slate-400 duration-500 text-3xl '
            onClick={() => router.push('/OfficePage')}
          >
            West Visayas State University
          </button>

          <button
            className=' text-white  hover:text-slate-400 duration-500 text-3xl '
            onClick={() => router.push('/LoginPage')}
          >
            Login
          </button>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
