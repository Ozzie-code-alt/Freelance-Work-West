'use client';
import { FocusCards } from '@/components/ui/focus-cards';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { cards } from '@/constants/indes';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const AdminHome = () => {
  const router = useRouter();
  return (
    <div className=' flex flex-col gap-10'>
      <Button
        onClick={() => {
          router.push('/OfficePage');
        }}
        className=' ml-10 mt-10 w-[100px]'
      >
        Back
      </Button>
      <div className='pt-10'>
        <GradualSpacing text='Admin Page' />
      </div>
      <FocusCards cards={cards} />;
    </div>
  );
};

export default AdminHome;
