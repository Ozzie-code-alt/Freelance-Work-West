'use client';
import Globaldrawer from '@/components/drawer';
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className=' flex w-full'>
      <div className=' w-full h-auto'>
        <div>
          <span className='font-bold'>{session?.user?.name}</span>
        </div>
      </div>
      <div className=' flex justify-end items-end  w-full h-auto'>
        <Globaldrawer route='/' />
      </div>
    </div>
  );
};

export default UserInfo;
