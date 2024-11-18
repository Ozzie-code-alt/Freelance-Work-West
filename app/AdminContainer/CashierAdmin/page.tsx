'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { BACcolumns } from '@/app/payments/BACColumns';
import { Cashiercolumns } from '@/app/payments/CashierColumns';
import Example from '@/components/Loader';
import { FileX2 } from 'lucide-react';
export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/cashier');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('cashiers')) {
          throw new Error('Expected property bac not found in the response');
        }

        const { cashiers } = jsonResponse;
        console.log('This is Cashiers Info', cashiers);
        setData(cashiers); // Update the state with the fetched data
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

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
    <div className='container mx-auto py-10'>
      <DataTable columns={Cashiercolumns} data={data} />
    </div>
  );
}
