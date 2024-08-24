'use client';
import { ReactLenis } from 'lenis/dist/lenis-react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { SiSpacex } from 'react-icons/si';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { useRef } from 'react';
import LoginModal from '@/components/LoginModal';

const Loginpage = () => {
  return (
    <div className='bg-zinc-950'>
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
        <Hero />
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

const SECTION_HEIGHT = 1500;

const Hero = () => {
  return (
    <div style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }} className='relative w-full'>
      <CenterImage />

      <ParallaxImages />

      <div className='absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950' />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollY, [0, SECTION_HEIGHT + 500], ['100%', '100%']);
  const opacity = useTransform(scrollY, [SECTION_HEIGHT, SECTION_HEIGHT + 500], [1, 0]);

  return (
    <motion.div
      className='sticky top-0 h-screen w-full'
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage:
          'url(https://www.finduniversity.ph/_resources/business/7515/wvsu-671.jpeg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    />
  );
};

const ParallaxImages = () => {
  return (
    <div className='mx-auto max-w-5xl px-4 pt-[200px]'>
      <ParallaxImg
        src='https://www.finduniversity.ph/_resources/business/7515/wvsu-639.jpeg'
        alt='And example of a space launch'
        start={-200}
        end={200}
        className='w-1/3'
      />
      <ParallaxImg
        src='https://farm8.staticflickr.com/7297/8791661637_ab5c97850a_z.jpg'
        alt='An example of a space launch'
        start={200}
        end={-250}
        className='mx-auto w-2/3'
      />
      <ParallaxImg
        src='https://www.vsu.edu.ph/images/edtech2.jpg'
        alt='Orbiting satellite'
        start={-200}
        end={200}
        className='ml-auto w-1/3'
      />
      <ParallaxImg
        src='https://th.bing.com/th/id/OIP.gkuq807REV-oCJrnIK9YlAAAAA?rs=1&pid=ImgDetMain'
        alt='Orbiting satellite'
        start={0}
        end={-500}
        className='ml-24 w-5/12'
      />
    </div>
  );
};

const ParallaxImg = ({
  className,
  alt,
  src,
  start,
  end
}: {
  className?: string;
  alt: string;
  src: string;
  start: number;
  end: number;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // @ts-ignore
    offset: [`${start}px end`, `end ${end * -1}px`]
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

const Schedule = () => {
  return (
    <section id='launch-schedule' className='mx-auto max-w-5xl flex justify-center    px-4 py-48 text-white'>
      <LoginModal route='/OfficePage' />
    </section>
  );
};

const ScheduleItem = ({
  title,
  date,
  location
}: {
  title: string;
  date: string;
  location: string;
}) => {
  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.75 }}
      className='mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9'
    >
      <div>
        <p className='mb-1.5 text-xl text-zinc-50'>{title}</p>
        <p className='text-sm uppercase text-zinc-500'>{date}</p>
      </div>
      <div className='flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500'>
        <p>{location}</p>
        <FiMapPin />
      </div>
    </motion.div>
  );
};

export default Loginpage;
