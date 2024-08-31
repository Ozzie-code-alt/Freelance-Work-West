'use client';
import OfficesContianer from '@/components/OfficesContianer';
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { useRouter } from 'next/navigation';
import { FiAlertCircle } from 'react-icons/fi';

const Officepage = () => {
  const { data: session } = useSession();
  const [grabRole, setGrabRole] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    signOut();
  };


  const handleUserChecker = () => {
    console.log('Clicked Dashboard');
    console.log(grabRole);
    if (grabRole === 'USER') {
      setIsOpen(true); // Set state to open modal
    }
  };

  useEffect(() => {
    const grabUserHEHE = async () => {
      if (!session) {
        // Wait until the session is fully loaded
        return;
      }

      // Check if session has a valid user and their role
      if (session?.user?.role === 'USER') {
        setGrabRole('USER');
        console.log('Grabbed User');
      } else if (session?.user?.role === 'ADMIN') {
        setGrabRole('ADMIN');
        console.log('Grabbed Admin');
      } else {
        console.log('No valid role found');
      }
    };

    grabUserHEHE();
  }, [session]);
  const links = [
    {
      label: 'Dashboard',
      href: handleUserChecker,
      icon: (
        <IconBrandTabler className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Profile',
      href: () => {},
      icon: (
        <IconUserBolt className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Settings',
      href: () => {},

      icon: (
        <IconSettings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    },
    {
      label: 'Logout',
      href: handleLogout,

      icon: (
        <IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
      )
    }
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
        'h-screen'
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className='justify-between gap-10'>
          <div className='flex flex-col  flex-1 overflow-y-auto overflow-x-hidden'>
            {open ? <Logo /> : <LogoIcon />}
            <div className='mt-8 flex flex-col gap-2'>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${session?.user?.name} - ${session?.user.role} `,
                href: () => {},
                icon: (
                  <Image
                    src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    className='h-7 w-7 flex-shrink-0 object-cover rounded-full'
                    width={50}
                    height={50}
                    alt='Avatar'
                  />
                )
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className='w-full h-full flex  flex-col bg-slate-500/10  justify-center items-center'>
        <div className='pt-3  '>
          <GradualSpacing
            className='font-display text-center text-4xl font-bold tracking-[-0.1em]  text-black dark:text-white md:text-7xl '
            text='West Thesis'
          />
        </div>

        <OfficesContianer />
      </div>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      href='#'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium text-black dark:text-white whitespace-pre'
      >
        West Thesis Group
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href='#'
      className='font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20'
    >
      <div className='h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0' />
    </Link>
  );
};

const SpringModal = ({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer'
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className='bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden'
          >
            <FiAlertCircle className='text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24' />
            <div className='relative z-10'>
              <div className='bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto'>
                <FiAlertCircle />
              </div>
              <h3 className='text-3xl font-bold text-center mb-2'>
                Seems Like your Account is not an Admin
              </h3>
              <p className='text-center mb-6'>Are you an Admin ?</p>
              <div className='flex gap-2'>
                <button
                  onClick={() => setIsOpen(false)}
                  className='bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded'
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    router.push('/AdminPasscode');
                  }}
                  className='bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded'
                >
                  Yes
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Officepage;
