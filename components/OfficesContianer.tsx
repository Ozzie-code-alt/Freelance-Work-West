'use client';

import { Carousel, Card } from '@/components/ui/apple-carousel';
import Image from 'next/image';
import BACFormPage from './BACForm/BACForm';
import AdminOfficeandFinancePage from './AdminOfficeAndFinance/AdminOfficeandFinancePage';
import AccountingFormPage from './Accounting/AccountingForm';
import LibraryFormPage from './Library/LibraryForm';

import EducFormPage from './EDUC/EDUCForm';
import MedicalFormPage from './Medical/MedicalForm';
import ICTFormPage from './ICT/ICTForm';
import IndustrialTechFormPage from './IndustrialTech/IndustrialTechForm';
import SBMFormPage from './SBM/SBMForm';
import RegistrarFormPage from './Registrar/RegistrarForm';
import OSAFormPage from './OSA/OSAForm';
const OfficesContianer = () => {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);
  return <Carousel items={cards} />;
};

export default OfficesContianer;

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4'
          >
            <p className='text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto'>
              <span className='font-bold text-neutral-700 dark:text-neutral-200'>
                The first rule of Apple club is that you boast about Apple club.
              </span>{' '}
              Keep a journal, quickly jot down a grocery list, and take amazing class notes. Want to
              convert those notes to text? No problem. Langotiya jeetu ka mara hua yaar is ready to
              capture every thought.
            </p>
            <Image
              src='https://assets.aceternity.com/macbook.png'
              alt='Macbook mockup from Aceternity UI'
              height='500'
              width='500'
              className='md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain'
            />
          </div>
        );
      })}
    </>
  );
};
const data = [
  {
    category: 'Admin Office and Finance Office',
    title: 'Admin Office and Finance',
    src: '/Offices/AdminOffice.jpg',
    content: <AdminOfficeandFinancePage />
  },
  {
    category: 'BAC Office',
    title: 'BAC',
    src: '/Offices/BAC.JPG',
    content: <BACFormPage />
  },
  {
    category: 'Accounting Office',
    title: 'Accounting',
    src: 'https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <AccountingFormPage />
  },

  {
    category: 'Library Office',
    title: 'Library',
    src: '/Offices/Library.JPG',
    content: <LibraryFormPage />
  },
  {
    category: 'Medical and Dental Clinic Office',
    title: 'Medical and Dental Clinic',
    src: '/Offices/Medical.JPG',
    content: <MedicalFormPage />
  },
  {
    category: 'OD Educ Office',
    title: 'OD Educ',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <EducFormPage />
  },
  {
    category: 'OD ICT Office',
    title: 'OD ICT',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <ICTFormPage />
  },
  {
    category: 'OD Industrial Tech Office',
    title: 'OD Industrial Tech',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <IndustrialTechFormPage />
  },
  {
    category: 'OD SBM Office',
    title: 'OD SBM',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <SBMFormPage />
  },
  {
    category: 'Office of Registrar Office',
    title: 'Office of Registrar',
    src: '/Offices/Registrar.JPG',
    content: <RegistrarFormPage />
  },
  {
    category: 'OSA Office',
    title: 'OSA',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <OSAFormPage />
  },
  {
    category: 'Planning and Development Unit Office',
    title: 'Planning and Development Unit',
    src: '/Offices/PDU.JPG',
    content: <DummyContent />
  },
  {
    category: 'Records and Management Unit Office',
    title: 'Records and Management Unit',
    src: '/Offices/RMU.JPG',
    content: <DummyContent />
  },
  {
    category: 'RIX Office',
    title: 'RIX',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <DummyContent />
  },
  {
    category: 'Sports Office ',
    title: 'Sports Office',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <DummyContent />
  },
  {
    category: 'Supply Building 1 Office',
    title: 'Supply Building 1',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <DummyContent />
  }
];
