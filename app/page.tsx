// // 'use client';
// // import QrcodePage from '@/components/qrcodePage';
// // import { BackgroundBeamsWithCollision } from '@/components/ui/background-collision';
// // import { useRouter } from 'next/navigation';
// // import { useState } from 'react';

// // export default function Home() {
// //   const router = useRouter();
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleNavigation = (path: string) => {
// //     setIsLoading(true);
// //     router.push(path);
// //   };

// //   return (
// //     <BackgroundBeamsWithCollision>
// //       <div className='h-screen w-screen bg-gradient-to-b from-[rgb(2,0,36)] to-[rgba(86,90,112,0.95)] flex flex-col justify-center items-center'>
// //         <QrcodePage />

// //         <div className='rounded-xl border-black z-40 bg-black/50 hover:cursor-pointer mt-10 px-20 py-10'>
// //           <button
// //             className={`text-white hover:text-slate-400 duration-500 text-3xl ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
// //             onClick={() => handleNavigation('/OfficePage')}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Loading...' : 'West Visayas State University Form - Student'}
// //           </button>
// //         </div>

// //         <div className='rounded-xl border-black z-40 bg-black/50 hover:cursor-pointer mt-10 px-20 py-10'>
// //           <button
// //             className={`text-white hover:text-slate-400 duration-500 text-3xl ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
// //             onClick={() => handleNavigation('/LoginPage')}
// //             disabled={isLoading}
// //           >
// //             {isLoading ? 'Loading...' : 'Login - Admin'}
// //           </button>
// //         </div>
// //       </div>
// //     </BackgroundBeamsWithCollision>
// //   );
// // }
// //https://github.com/darkroomengineering/lenis/tree/main/packages/react

// // https://cruip.com/create-an-image-accordion-with-tailwind/
// 'use client';

// import QrcodePage from '@/components/qrcodePage';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import React, { useState } from 'react';

// const items = [
//   {
//     id: '1',
//     url: '/Teacher-Home.svg',
//     title: 'Login Page',
//     description: 'Teachers - Admins - Principals',
//     tags: ['Floral', 'Highlands', 'Wildflowers', 'Colorful', 'Resilience'],
//     redirect: '/LoginPage'
//   },

//   {
//     id: '2',
//     url: '/Student-Home.svg',
//     title: 'Client Feedback Form',
//     description: 'Students - Visitors - Parents',
//     tags: ['Twilight', 'Peaks', 'Silhouette', 'Evening Sky', 'Peaceful'],
//     redirect: '/OfficePage'
//   },

// ];
// function Home() {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const handleNavigation = (path: string) => {
//     setIsLoading(true);
//     router.push(path);
//   };
//   return (
//     <div className='bg-black h-auto  md:h-fit w-screen'>
//       <div className='group flex max-md:flex-col justify-center gap-2 w-[80%] mx-auto mb-4 '>
//         {items.map((item, i: number) => {
//           return (
//             <article key={i} className='group/article cursor-pointer relative w-full rounded-xl overflow-hidden md:group-hover:[&:not(:hover)]:w-[20%] md:group-focus-within:[&:not(:focus-within):not(:hover)]:w-[20%] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.15)] before:absolute before:inset-x-0 before:bottom-0 before:h-1/3 before:bg-gradient-to-t before:from-black/50 before:transition-opacity md:before:opacity-0 md:hover:before:opacity-100 focus-within:before:opacity-100 after:opacity-0 md:group-hover:[&:not(:hover)]:after:opacity-100 md:group-focus-within:[&:not(:focus-within):not(:hover)]:after:opacity-100 after:absolute after:inset-0 after:bg-white/30 after:backdrop-blur after:rounded-lg after:transition-all focus-within:ring focus-within:ring-indigo-300'>
//               <div
//                 className='absolute inset-0 text-white z-10  p-3 flex flex-col justify-end'
//                 onClick={() => handleNavigation(item.redirect)}
//               >
//                 <h1 className=' text-xl font-medium   md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-300 group-focus-within/article:delay-300'>
//                   {item?.title}
//                 </h1>
//                 <span className=' text-3xl font-medium  md:whitespace-nowrap md:truncate md:opacity-0 group-hover/article:opacity-100 group-focus-within/article:opacity-100 md:translate-y-2 group-hover/article:translate-y-0 group-focus-within/article:translate-y-0 transition duration-200 ease-[cubic-bezier(.5,.85,.25,1.8)] group-hover/article:delay-500 group-focus-within/article:delay-500'>
//                   {item?.description}
//                 </span>
//               </div>
//               <Image
//                 className='object-contain h-72 cursor-pointer md:h-[470px]  w-full'
//                 src={item?.url}
//                 width='60'
//                 height='180'
//                 alt='Image 01'
//               />
//             </article>
//           );
//         })}
//       </div>
//       <div className=' h-full w-screen bg-gradient-to-b bg-black flex flex-col pt-10 items-center'>
//         <QrcodePage />
//       </div>
//     </div>
//   );
// }

// export default Home;
'use client';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  ClapperboardIcon as ChalkboardTeacher,
  Users,
  School,
  GraduationCap,
  UserRound,
  Users2
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import QrcodePage from '@/components/qrcodePage';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-collision';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleNavigation = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };
  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8 text-center'>
          <h1 className='text-4xl font-bold mb-4'>School Portal Access</h1>
          <p className='text-muted-foreground'>Select your role to continue</p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          {/* Staff Section */}
          <Card
            className='bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer'
            onClick={() => handleNavigation('/LoginPage')}
          >
            <div className='p-6 space-y-6'>
              <h2 className='text-2xl font-bold text-white text-center mb-6'>Admin Portal</h2>
              <div className='grid gap-4'>
                <Label
                  htmlFor='admin'
                  className='flex items-center text-white w-full p-2 rounded-md text-lg hover:bg-primary hover:text-primary-foreground transition-all'
                >
                  <Users className='mr-4 h-5 w-5' />
                  Administrators
                </Label>
              </div>
            </div>
          </Card>

          {/* Students & Visitors Section */}
          <Card
            className='bg-zinc-900 border-zinc-800 overflow-hidden cursor-pointer'
            onClick={() => handleNavigation('/OfficePage')}
          >
            <div className='p-6 space-y-6'>
              <h2 className='text-2xl font-bold text-center text-white mb-6'>
                Student & Visitor Portal
              </h2>
              <div className='grid gap-4'>
                <Label
                  htmlFor='students'
                  className='flex items-center w-full p-2 text-white rounded-md text-lg hover:bg-primary hover:text-primary-foreground transition-all'
                >
                  <GraduationCap className='mr-4 h-5 w-5' />
                  Students
                </Label>

                <Label
                  htmlFor='visitors'
                  className='flex items-center w-full p-2 text-white rounded-md text-lg hover:bg-primary hover:text-primary-foreground transition-all'
                >
                  <UserRound className='mr-4 h-5 w-5' />
                  Visitors
                </Label>

                <Label
                  htmlFor='parents'
                  className='flex items-center w-full text-white p-2 rounded-md text-lg hover:bg-primary hover:text-primary-foreground transition-all'
                >
                  <Users2 className='mr-4 h-5 w-5' />
                  Parents
                </Label>
              </div>
            </div>
          </Card>
        </div>

        {/* QR Code Section */}
        <div className='mt-12 text-center'>
          <p className='text-muted-foreground mb-4'>Scan to access on mobile devices</p>
          <div className='inline-block p-4 bg-white rounded-xl'>
            {/* <Image
              src="/placeholder.svg"
              alt="QR Code"
              width={150}
              height={150}
              className="mx-auto"
            /> */}
            <QrcodePage />
          </div>
        </div>
      </div>
    </div>
  );
}
