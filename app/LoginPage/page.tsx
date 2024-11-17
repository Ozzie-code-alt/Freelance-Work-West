'use client';
import { ReactLenis } from 'lenis/dist/lenis-react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { SiSpacex } from 'react-icons/si';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useRef } from 'react';
import LoginModal from '@/components/LoginModal';

const Loginpage = () => {
  return (
    <div className='bg-[url(/LoginFormBG.png)] h-screen'>
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 1,
          // infinite: true,
          // syncTouch: true
        }}
      >
        <Nav />

        <Schedule />
      </ReactLenis>
    </div>
  );
};

const Nav = () => {
  return (
    <nav className='fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white'>
      <SiSpacex className='text-3xl mix-blend-difference' />
      <button
        onClick={() => {
          document.getElementById('launch-schedule')?.scrollIntoView({
            behavior: 'smooth'
          });
        }}
        className='flex items-center gap-1 text-xl text-zinc-400'
      >
        Thesis Login Form <FiArrowRight />
      </button>
    </nav>
  );
};






const Schedule = () => {
  return (
    <section id='launch-schedule' className='mx-auto max-w-5xl flex justify-center h-full    px-4 py-48 text-white'>
      <LoginModal route='/OfficePage' />
    </section>
  );
};


export default Loginpage;
