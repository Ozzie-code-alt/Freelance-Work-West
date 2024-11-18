'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
// import { BACcolumns } from '@/app/payments/BACColumns';
import { RIXcolumns } from '@/app/payments/RIXColumns';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';
import { FileX2 } from 'lucide-react';
export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/rix');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('rixs')) {
          throw new Error('Expected property bac not found in the response');
        }

        const { rixs } = jsonResponse;
        console.log('This is RIX Info Admin', rixs);

        console.log('this is new data', rixs);

        setData(rixs);
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
              It looks like there's no data to display at the moment. Try adding some data or
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
        <GradualSpacing text='Bac Admin' className='text-center text-6xl' />
      </div>

      <div className=''>
        <DataTable columns={RIXcolumns} data={data} />
      </div>
    </div>
  );
}
