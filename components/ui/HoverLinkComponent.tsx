
import { Months } from '@/constants/indes';
import { useMotionValue, motion, useSpring, useTransform } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from './button';

export const HoverImageLinksData = ({ data }: any) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [monthData, setMonthData] = useState([]);

  const getMonthData = (monthIndex: number) => {
    return data.filter((item: any) => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === monthIndex;
    });
  };

  const handleLinkClick = (monthIndex: number, monthTitle: string) => {
    const dataForMonth = getMonthData(monthIndex);
    setMonthData(dataForMonth);
    setSelectedMonth(monthTitle);
    setIsDrawerOpen(true);
  };

  return (
    <section className='bg-neutral-950 rounded-xl p-4 md:p-8'>
      <div className='mx-auto max-w-5xl'>
        {Months.map((month: any, monthIndex: any) => (
          <div key={monthIndex} className='border w-full border-black rounded-2xl font px-5 py-4'>
            <Link
              heading={month.title}
              subheading='Learn what we do here'
              imgSrc=''
              onClick={() => handleLinkClick(monthIndex, month.title)}
            />
          </div>
        ))}
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedMonth} Data</DrawerTitle>
            <DrawerDescription>
              {monthData.length > 0 ? (
                monthData.map((item: any, itemIndex: number) => (
                  <div key={itemIndex}>
                    <p>Student Name: {item.userName}</p>
                  </div>
                ))
              ) : (
                <p>No data available for this month.</p>
              )}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

interface LinkProps {
  heading: string;
  imgSrc: string;
  subheading: string;
  onClick: () => void;
}

const Link = ({ heading, imgSrc, subheading, onClick }: LinkProps) => {
    const ref = useRef<HTMLAnchorElement | null>(null);
  
    const x = useMotionValue(0);
    const y = useMotionValue(0);
  
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
  
    const top = useTransform(mouseYSpring, [0.5, -0.5], ['40%', '60%']);
    const left = useTransform(mouseXSpring, [0.5, -0.5], ['60%', '70%']);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      const rect = ref.current!.getBoundingClientRect();
  
      const width = rect.width;
      const height = rect.height;
  
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
  
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
  
      x.set(xPct);
      y.set(yPct);
    };
  
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();  // Prevent the default anchor click behavior
      onClick();  // Call the provided onClick function
    };
  
    return (
      <motion.a
        href='#'
        ref={ref}
        onMouseMove={handleMouseMove}
        onClick={handleClick}  // Use the modified click handler
        initial='initial'
        whileHover='whileHover'
        className='group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-neutral-50 md:py-8'
      >
        <div>
          <motion.span
            variants={{
              initial: { x: 0 },
              whileHover: { x: -16 }
            }}
            transition={{
              type: 'spring',
              staggerChildren: 0.075,
              delayChildren: 0.25
            }}
            className='relative z-10 block text-4xl font-bold text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50 md:text-6xl'
          >
            {heading.split('').map((l: any, i: any) => (
              <motion.span
                variants={{
                  initial: { x: 0 },
                  whileHover: { x: 16 }
                }}
                transition={{ type: 'spring' }}
                className='inline-block'
                key={i}
              >
                {l}
              </motion.span>
            ))}
          </motion.span>
          <span className='relative z-10 mt-2 block text-base text-neutral-500 transition-colors duration-500 group-hover:text-neutral-50'>
            {subheading}
          </span>
        </div>
        <div></div>
        <motion.img
          style={{
            top,
            left,
            translateX: '-50%',
            translateY: '-50%'
          }}
          variants={{
            initial: { scale: 0, rotate: '-12.5deg' },
            whileHover: { scale: 1, rotate: '12.5deg' }
          }}
          transition={{ type: 'spring' }}
          src={imgSrc}
          className='absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64'
          alt={`Image representing a link for ${heading}`}
        />
  
        <motion.div
          variants={{
            initial: {
              x: '25%',
              opacity: 0
            },
            whileHover: {
              x: '0%',
              opacity: 1
            }
          }}
          transition={{ type: 'spring' }}
          className='relative z-10 p-4'
        >
          <FiArrowRight className='text-5xl text-neutral-50' />
        </motion.div>
      </motion.a>
    );
  };
  