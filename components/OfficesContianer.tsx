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
import PDUFormPage from './PDU/PDUForm';
import RMUFormPage from './RMU/RMUForm';
import RIXFormPage from './RIX/RIXForm';
import SportsOfficeFormPage from './SportsOffice/SportsOfficeForm';
import SupplyBuildingFormPage from './SupplyBuilding/SupplyBuildingForm';
const OfficesContianer = () => {
  const cards = data.map((card, index) => <Card key={card.src} card={card} index={index} />);
  return <Carousel items={cards} />;
};

export default OfficesContianer;

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
    content: <PDUFormPage/>
  },
  {
    category: 'Records and Management Unit Office',
    title: 'Records and Management Unit',
    src: '/Offices/RMU.JPG',
    content: <RMUFormPage/>
  },
  {
    category: 'RIX Office',
    title: 'RIX',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <RIXFormPage/>
  },
  {
    category: 'Sports Office ',
    title: 'Sports Office',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <SportsOfficeFormPage/>
  },
  {
    category: 'Supply Building 1 Office',
    title: 'Supply Building 1',
    src: 'https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <SupplyBuildingFormPage/>
  }
];
