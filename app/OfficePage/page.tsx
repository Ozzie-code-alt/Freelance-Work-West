'use client';
import OfficesContianer from '@/components/OfficesContianer';
import UserInfo from '@/components/userInfo';

const Officepage = () => {
  return (
    <section className='w-screen h-screen'>
      <div className='flex flex-col md:flex-row '>
        {/*Left Div */}
        <div className='h-screen bg-slate-500/10 px-20 py-10 w-auto border-r-2 '>
          <div className='flex flex-col h-full '>
            <div className='pb-5'>
              <h1>
                {' '}
                <span className='text-5xl'>Welcome Back</span>
              </h1>
            </div>
            <UserInfo />
          </div>
        </div>
        <div className='w-full h-full flex  flex-col justify-center items-center'>
          <div className='px-10 pt-3'>
            <h1 className='text-3xl md:text-5xl text-center '>
              <span className='font-bold'>West Visayas State</span> Feedback Forms
            </h1>
          </div>

          <OfficesContianer />
        </div>
      </div>
    </section>
  );
};

export default Officepage;
