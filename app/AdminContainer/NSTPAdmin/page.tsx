'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { NSTPcolumns } from '@/app/payments/NSTPColumn';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/nstp');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('nstps')) {
          throw new Error('Expected property nstp not found in the response');
        }

        const { nstps } = jsonResponse;
        console.log('This is BAC Info Admin', nstps);

        console.log('this is new data', nstps);

        setData(nstps);
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
        <DataTable columns={NSTPcolumns} data={data} />
      </div>

    </div>
  );
}
