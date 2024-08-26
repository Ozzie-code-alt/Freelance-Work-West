import { FocusCards } from '@/components/ui/focus-cards';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { cards } from '@/constants/indes';

const AdminHome = () => {

  return (
    <div className=' flex flex-col gap-10'>
      <div className='pt-10'>
        <GradualSpacing text='Admin Page' />
      </div>
      <FocusCards cards={cards} />;
    </div>
  );
};

export default AdminHome;
