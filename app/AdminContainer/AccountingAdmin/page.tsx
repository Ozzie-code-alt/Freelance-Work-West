"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import Example from "@/components/Loader";
import { Accountingcolumns } from "@/app/payments/AccountingColumns";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { HoverImageLinksData } from "@/components/ui/HoverLinkComponent";
import { FileX2 } from "lucide-react";

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/accounting");
        if (!res.ok) {
          throw new Error(
            `API call failed with status: ${res.status} ${res.statusText}`
          );
        }
        const jsonResponse = await res.json();
        console.log("Raw JSON Response:", jsonResponse);

        if (!jsonResponse.hasOwnProperty("accounting")) {
          throw new Error(
            "Expected property accountingInfo not found in the response"
          );
        }

        const { accounting } = jsonResponse;
        console.log("This is Accounting Info", accounting);
        setData(accounting); // Update the state with the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  
  if (!data.length) {
    return (
      <div className='min-h-screen bg-background flex flex-col'>
        <header className='border-b'>
          <div className='container mx-auto px-4 py-4'>
            <h1 className='text-2xl font-bold text-foreground'>Dashboard</h1>
          </div>
        </header>
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
    // <div className="container w-screen h-screen flex justify-center items-center mx-auto py-10">
    //   <DataTable columns={Accountingcolumns} data={data} />
    // </div>
    <div className='container mx-auto h-auto  flex flex-col gap-5   py-10'>
    <div className='w-full  '>
      <GradualSpacing text='Acconting Admin' className='text-center text-6xl' />
    </div>

    <div className=''>
      <DataTable columns={Accountingcolumns} data={data} />
    </div>


  </div>
  );
}
