'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type CardProps = {
  title: string;
  src: string;
  route: string;
};

const gradientColors = [
  'bg-gradient-to-r from-blue-300 to-yellow-300',
  'bg-gradient-to-r from-rose-400 to-red-500',
  'bg-gradient-to-r from-yellow-400 to-orange-500',
  'bg-gradient-to-r from-red-500 to-orange-500',
  'bg-gradient-to-r from-purple-500 to-purple-900',
  'bg-gradient-to-r from-blue-400 to-indigo-500',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-violet-400 to-purple-300',
  'bg-gradient-to-r from-blue-600 to-violet-600',
  'bg-gradient-to-r from-orange-300 to-rose-300',
  'bg-gradient-to-r from-cyan-200 to-cyan-400',
  'bg-gradient-to-r from-slate-900 to-slate-700',
  'bg-gradient-to-r from-rose-300 to-rose-500',
  'bg-gradient-to-r from-violet-200 to-pink-200',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-indigo-400 to-cyan-400',
  'bg-gradient-to-r from-teal-200 to-lime-200',
  'bg-gradient-to-r from-fuchsia-500 to-pink-500',
  'bg-gradient-to-r from-orange-600 to-orange-500',
  'bg-gradient-to-r from-amber-200 to-yellow-500',
  'bg-gradient-to-r from-purple-200 to-purple-800',
  'bg-gradient-to-r from-green-200 to-blue-500',

];

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered
  }: {
    card: CardProps;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <Link href={card.route}>
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          `rounded-lg relative overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out`,
          hovered !== null && hovered !== index && 'blur-sm scale-[0.98]',
          gradientColors[index % gradientColors.length] 
        )}
      >
        {/* <Image src={card.src} alt={card.title} fill className='object-cover absolute inset-0' /> */}
        <div
          className={cn(
            'absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300',
            hovered === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className='text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200'>
            {card.title}
          </div>
        </div>
      </div>
    </Link>
  )
);

Card.displayName = 'Card';
type Card = {
  title: string;
  src: string;
  route: string;
};
export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full'>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
