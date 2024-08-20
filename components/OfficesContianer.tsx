'use client';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Offices, OfficesStudents } from '@/constants/indes';
import Link from 'next/link';
const OfficesContianer = () => {
  return (
    <Carousel
      opts={{
        align: 'start'
      }}
      orientation='vertical'
      className='w-full max-w-[700px]'
    >
      <CarouselContent className='-mt-1 h-[600px]'>
        {OfficesStudents.map(
          (
            office,
            index // add constants here make this dynamic
          ) => (
            <CarouselItem key={index} className='pt-1 md:basis-1/2'>
              <div className='p-1'>
                <Link href={office.route}>
                  <Card>
                    <CardContent className='flex items-center h-[200px]  justify-center p-6'>
                      <span className='text-3xl font-semibold'>{office.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          )
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default OfficesContianer;
