'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { SupplyBuildingcolumns } from '@/app/payments/SupplyBuildingColumn';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/supplyBuilding');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('supplyBuildings')) {
          throw new Error('Expected property supplyBuilding not found in the response');
        }

        const { supplyBuildings } = jsonResponse;
        console.log('This is BAC Info Admin', supplyBuildings);

        console.log('this is new data', supplyBuildings);

        setData(supplyBuildings);
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
        <GradualSpacing text='Supply Building Admin' className='text-center text-6xl' />
      </div>

      <div className=''>
        <DataTable columns={SupplyBuildingcolumns} data={data} />
      </div>


    </div>
  );
}
