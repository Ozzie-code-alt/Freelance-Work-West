'use client';
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
const AdminPage = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='bg-purple-500'>Admin Page</Button>
      </DrawerTrigger>
      <DrawerContent className='flex  justify-center items-center'>
        <div className='w-full flex flex-col justify-center items-center'>
          <DrawerHeader>
            <DrawerTitle>List of Offices</DrawerTitle>
            <DrawerDescription>Records and Stats</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className='grid grid-cols-3 w-fit'>
            {/*TODO: Map this Later */}
            <Button className='text-2xl uppercase'>Admin Office and Finance</Button>
            <Button className='text-2xl uppercase'>BAC</Button>
            <Button className='text-2xl uppercase'>Accounting</Button>
            <Button className='text-2xl uppercase'>LIbrary</Button>
            <Button className='text-2xl uppercase'>medical and Dental Clinic</Button>
            <Button className='text-2xl uppercase'>OD Educ</Button>
            <Button className='text-2xl uppercase'>OD ICT</Button>
            <Button className='text-2xl uppercase'>OD Industrial tech</Button>
            <Button className='text-2xl uppercase'>OD SBM</Button>
            <Button className='text-2xl uppercase'>Office of Registrar</Button>
            <Button className='text-2xl uppercase'>Osa</Button>
            <Button className='text-2xl uppercase'>Planning and development unit</Button>
            <Button className='text-2xl uppercase'>records and management unit</Button>
            <Button className='text-2xl uppercase'>rixs</Button>
            <Button className='text-2xl uppercase'>Sports office</Button>
            <Button className='text-2xl uppercase'>supply building 1</Button>
          </DrawerFooter>
          <DrawerClose>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AdminPage;
