'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
// import { BACcolumns } from '@/app/payments/BACColumns';
import { SBMcolumns } from '@/app/payments/SBMColumns';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/sbm');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('sbms')) {
          throw new Error('Expected property bac not found in the response');
        }

        const { sbms } = jsonResponse;
        console.log('This is BAC Info Admin', sbms);

        console.log('this is new data', sbms);

        setData(sbms);
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
        <GradualSpacing text='Bac Admin' className='text-center text-6xl' />
      </div>

      <div className=''>
        <DataTable columns={SBMcolumns} data={data} />
      </div>

    </div>
  );
}
