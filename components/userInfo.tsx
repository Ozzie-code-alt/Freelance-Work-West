'use client';
import Globaldrawer from '@/components/drawer';
import { useSession } from 'next-auth/react';
import AdminPage from './AdminPage';

const UserInfo = () => {
  const { data: session } = useSession();
  return (
    <div className=' flex flex-col h-full justify-between  gap-5 w-full '>
      <div className=' w-full h-auto'>
        <div>
          <span className='font-bold'>{session?.user?.name}</span>
        </div>
      </div>
      <div className=' flex justify-between items-end w-full h-auto'>
        <Globaldrawer route='/' />
        <AdminPage />
      </div>
    </div>
  );
};

export default UserInfo;
