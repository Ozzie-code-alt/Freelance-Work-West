'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Registrarcolumns } from '@/app/payments/RegistrarColumns';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/register');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('registers')) {
          throw new Error('Expected property register not found in the response');
        }

        const { registers } = jsonResponse;
        console.log('This is BAC Info Admin', registers);

        console.log('this is new data', registers);

        setData(registers);
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
        <DataTable columns={Registrarcolumns} data={data} />
      </div>

      <div className='w-full    '>
        <GradualSpacing text='Filter By Month' className='text-center text-6xl' />
      </div>

      <div>
        <HoverImageLinksData data={data} />
      </div>
    </div>
  );
}
