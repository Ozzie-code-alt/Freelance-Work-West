import { Months } from '@/constants/indes'; // Corrected the typo here
import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { Button } from './ui/button';

const MonthFilter = ({ data }: any) => {
  const getMonthData = (monthIndex: number) => {
    return data.filter((item: any) => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === monthIndex;
    });
  };

  return (
    <div className='w-full h-full px-2 flex flex-wrap gap-5'>
      {Months.map((month:any, monthIndex:any) => (
        <div key={monthIndex} className='border w-fit border-black rounded-2xl font px-5 py-4'>
          <Drawer>
            <div>
              <DrawerTrigger>{month.title}</DrawerTrigger>
            </div>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{month.title} Data</DrawerTitle>
                <DrawerDescription>
                  {getMonthData(monthIndex).map((item: any, itemIndex: number) => (
                    <div key={itemIndex}>
                      <p>Student Name: {item.userName}</p>
                    </div>
                  ))}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant='outline'>Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      ))}
    </div>
  );
};

export default MonthFilter;
