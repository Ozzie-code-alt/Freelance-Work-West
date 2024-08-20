'use client';
import Globaldrawer from '@/components/drawer';
import { useSession } from 'next-auth/react';

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className=' flex flex-col gap-5 w-full '>
      <div className=' w-full h-auto'>
        <div>
          <span className='font-bold'>{session?.user?.name}</span>
        </div>
      </div>
      <div className=' flex justify-start items-end w-full h-auto'>
        <Globaldrawer route='/' />
      </div>
    </div>
  );
};

export default UserInfo;
