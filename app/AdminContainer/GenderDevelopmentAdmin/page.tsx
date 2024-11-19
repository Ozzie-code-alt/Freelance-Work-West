'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { GenderDevelopmentcolumns } from '@/app/payments/GenderDevelopmentColumn';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';
import { FileX2 } from 'lucide-react';

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/genderDevelopment');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('genderDevelopments')) {
          throw new Error('Expected property genderDevelopment not found in the response');
        }

        const { genderDevelopments } = jsonResponse;
        console.log('This is BAC Info Admin', genderDevelopments);

        console.log('this is new data', genderDevelopments);

        setData(genderDevelopments);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []);

  console.log(data);

  if (!data.length) {
    return (
      <div className='min-h-screen bg-background flex flex-col'>
        <main className='flex-grow flex items-center justify-center'>
          <div className='text-center'>
            <div className='inline-block p-6 bg-muted rounded-full mb-4'>
              <FileX2 className='w-12 h-12 text-muted-foreground' />
            </div>
            <h2 className='text-3xl font-bold text-foreground mb-2'>No data available</h2>
            <p className='text-muted-foreground mb-6 max-w-md mx-auto'>
              It looks like there&apos;s no data to display at the moment. Try adding some data or
              refreshing the page.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className='container mx-auto h-auto  flex flex-col gap-5   py-10'>
      <div className='w-full  '>
        <GradualSpacing text='Gender Development Office Admin' className='text-center text-6xl' />
      </div>

      <div className=''>
        <DataTable columns={GenderDevelopmentcolumns} data={data} />
      </div>
    </div>
  );
}
