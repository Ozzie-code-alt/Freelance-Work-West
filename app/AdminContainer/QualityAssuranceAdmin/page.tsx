'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { QualityAssurancecolumns } from '@/app/payments/QualityAssuranceColumn';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/qualityAssurance');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('qualityAssurances')) {
          throw new Error('Expected property qualityAssurance not found in the response');
        }

        const { qualityAssurances } = jsonResponse;
        console.log('This is BAC Info Admin', qualityAssurances);

        console.log('this is new data', qualityAssurances);

        setData(qualityAssurances);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  console.log(data);

  if (!data.length) {
    return <div className='w-screen h-screen flex justify-center items-center '></div>;
  }

  return (
    <div className='container mx-auto h-auto  flex flex-col gap-5   py-10'>
      <div className='w-full  '>
        <GradualSpacing text='Quality Assurance Admin' className='text-center text-6xl' />
      </div>

      <div className=''>
        <DataTable columns={QualityAssurancecolumns} data={data} />
      </div>

    </div>
  );
}
