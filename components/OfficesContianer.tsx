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
import { useState } from 'react';
const OfficesContainer = () => {
  // State to store the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter data based on search query
  const filteredData = data.filter(
    (office) =>
      office.title.toLowerCase().includes(searchQuery) ||
      office.category.toLowerCase().includes(searchQuery)
  );

  // Create cards from filtered data
  const cards = filteredData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className='w-full'>
      {/* Search input */}
      <div className="">
        <input
          type="text"
          placeholder="Search for an office..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="ml-10 p-2 border rounded-md w-fit"
        />
      </div>

      {/* Carousel with filtered cards */}
      {cards.length > 0 ? (
        <Carousel items={cards} />
      ) : (
        <p>No offices found for your search.</p>
      )}
    </div>
  );
};

export default OfficesContainer;


const data = [
  {
    category: 'Admin Office and Finance Office',
    title: 'Admin Office and Finance',
    src: 'https://images.unsplash.com/photo-1557683304-673a23048d34?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <AdminOfficeandFinancePage />
  },
  {
    category: 'BAC Office',
    title: 'BAC',
    src: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <BACFormPage />
  },
  {
    category: 'Accounting Office',
    title: 'Accounting',
    src: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8',
    content: <AccountingFormPage />
  },

  {
    category: 'Library Office',
    title: 'Library',
    src: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
    content: <LibraryFormPage />
  },
  {
    category: 'Medical and Dental Clinic Office',
    title: 'Medical and Dental Clinic',
    src: 'https://images.unsplash.com/photo-1635776062360-af423602aff3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <MedicalFormPage />
  },
  {
    category: 'OD Educ Office',
    title: 'OD Educ',
    src: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <EducFormPage />
  },
  {
    category: 'OD ICT Office',
    title: 'OD ICT',
    src: 'https://images.unsplash.com/photo-1557682257-2f9c37a3a5f3?q=80&w=1700&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <ICTFormPage />
  },
  {
    category: 'OD Industrial Tech Office',
    title: 'OD Industrial Tech',
    src: 'https://images.unsplash.com/photo-1618367588411-d9a90fefa881?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <IndustrialTechFormPage />
  },
  {
    category: 'OD SBM Office',
    title: 'OD SBM',
    src: 'https://images.unsplash.com/photo-1635776062043-223faf322554?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <SBMFormPage />
  },
  {
    category: 'Office of Registrar Office',
    title: 'Office of Registrar',
    src: 'https://images.unsplash.com/photo-1569982175971-d92b01cf8694?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <RegistrarFormPage />
  },
  {
    category: 'OSA Office',
    title: 'OSA',
    src: 'https://images.unsplash.com/photo-1635776063043-ab23b4c226f6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <OSAFormPage />
  },
  {
    category: 'Planning and Development Unit Office',
    title: 'Planning and Development Unit',
    src: 'https://images.unsplash.com/photo-1635776064096-4e12cce9ead4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <PDUFormPage/>
  },
  {
    category: 'Records and Management Unit Office',
    title: 'Records and Management Unit',
    src: 'https://images.unsplash.com/photo-1673526759321-3b3da765ffd8?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <RMUFormPage/>
  },
  {
    category: 'RIX Office',
    title: 'RIX',
    src: 'https://images.unsplash.com/photo-1706523868343-62ddc796cd15?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <RIXFormPage/>
  },
  {
    category: 'Sports Office ',
    title: 'Sports Office',
    src: 'https://images.unsplash.com/photo-1710162734239-f2368bc6fae1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <SportsOfficeFormPage/>
  },
  {
    category: 'Supply Building 1 Office',
    title: 'Supply Building 1',
    src: 'https://images.unsplash.com/photo-1710166755745-9ac9f1a6ae80?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: <SupplyBuildingFormPage/>
  }
];
