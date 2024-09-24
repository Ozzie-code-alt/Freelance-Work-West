// 'use client';
// import QrcodePage from '@/components/qrcodePage';
// import { BackgroundBeamsWithCollision } from '@/components/ui/background-collision';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function Home() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   const handleNavigation = (path: string) => {
//     setIsLoading(true);
//     router.push(path);
//   };

//   return (
//     <BackgroundBeamsWithCollision>
//       <div className='h-screen w-screen bg-gradient-to-b from-[rgb(2,0,36)] to-[rgba(86,90,112,0.95)] flex flex-col justify-center items-center'>
//         <QrcodePage />

//         <div className='rounded-xl border-black z-40 bg-black/50 hover:cursor-pointer mt-10 px-20 py-10'>
//           <button
//             className={`text-white hover:text-slate-400 duration-500 text-3xl ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
//             onClick={() => handleNavigation('/OfficePage')}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Loading...' : 'West Visayas State University Form - Student'}
//           </button>
//         </div>

//         <div className='rounded-xl border-black z-40 bg-black/50 hover:cursor-pointer mt-10 px-20 py-10'>
//           <button
//             className={`text-white hover:text-slate-400 duration-500 text-3xl ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
//             onClick={() => handleNavigation('/LoginPage')}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Loading...' : 'Login - Admin'}
//           </button>
//         </div>
//       </div>
//     </BackgroundBeamsWithCollision>
//   );
// }
//https://github.com/darkroomengineering/lenis/tree/main/packages/react

// https://cruip.com/create-an-image-accordion-with-tailwind/
'use client';

import QrcodePage from '@/components/qrcodePage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const items = [
  {
    id: '1',
    url: 'https://res.cloudinary.com/dzl9yxixg/image/upload/adrian_ibdgmu.png',
    title: 'Login Page',
    description: 'Teachers - Admins - Principals',
    tags: ['Floral', 'Highlands', 'Wildflowers', 'Colorful', 'Resilience'],
    redirect: '/LoginPage'
  },

  {
    id: '2',
    url: 'https://res.cloudinary.com/dzl9yxixg/image/upload/person-portrait_pwxyyj.jpg',
    title: 'Client Feedback Form',
    description: 'Students - Visitors - Parents',
    tags: ['Twilight', 'Peaks', 'Silhouette', 'Evening Sky', 'Peaceful'],
    redirect: '/OfficePage'
  },
  {
    id: '3',
    url: 'https://res.cloudinary.com/dzl9yxixg/image/upload/naymr_bmv5ac.png',
    title: 'Naymur Rahman',
    description: 'CTO & Co-Founder',
    tags: ['Rocky', 'Ridges', 'Contrast', 'Adventure', 'Clouds'],
    redirect: ''
  }
];
function index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleNavigation = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };
  return (
    <div className='bg-black h-screen w-screen'>
      <div className='group flex max-md:flex-col justify-center gap-2 w-[80%] mx-auto mb-4 '>
        {items.map((item, i: number) => {
          return (
            <article key={i} className='group/article relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:rounded-lg after:transition-all focus-within:ring focus-within:ring-indigo-300'>
              <div
                className='absolute inset-0 text-white z-10  p-3 flex flex-col justify-end'
                onClick={() => handleNavigation(item.redirect)}
              >
                <h1 className=' text-xl font-medium   md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300'>
                  {item?.title}
                </h1>
                <span className=' text-3xl font-medium  md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-500 group-focus-within/article:delay-500'>
                  {item?.description}
                </span>
              </div>
              <Image
                className='object-cover h-72 md:h-full  w-full'
                src={item?.url}
                width='960'
                height='480'
                alt='Image 01'
              />
            </article>
          );
        })}
      </div>
      <div className=' h-full w-screen bg-gradient-to-b bg-black flex flex-col pt-10 items-center'>
        <QrcodePage />
      </div>
    </div>
  );
}

export default index;
