"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { BACcolumns } from "@/app/payments/BACColumns";
import GradualSpacing from "@/components/ui/gradual-spacing";
import { HoverImageLinksData } from "@/components/ui/HoverLinkComponent";


export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/bac");
        if (!res.ok) {
          throw new Error(
            `API call failed with status: ${res.status} ${res.statusText}`
          );
        }
        const jsonResponse = await res.json();
        console.log("Raw JSON Response:", jsonResponse);

        if (!jsonResponse.hasOwnProperty("bacs")) {
          throw new Error(
            "Expected property bac not found in the response"
          );
        }

        const { bacs } = jsonResponse;
        console.log("This is BAC Info Admin", bacs);

        console.log("this is new data", bacs)

        setData(bacs); 
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount


    console.log(data)


  if (!data.length) {
    return <div className="w-screen h-screen flex justify-center items-center ">
      
    </div>;
  }


  return (
    <div className="container mx-auto h-auto  flex flex-col gap-5   py-10">

      <div className="w-full  ">
      <GradualSpacing
        text="Bac Admin"
        className="text-center text-6xl"
        />
      </div>

      <div className="">
      <DataTable columns={BACcolumns} data={data} />
      </div>

      <div className="w-full    ">
        
        <GradualSpacing
        text="Filter By Month"
        className="text-center text-6xl"
        />
      </div>

      <div>
        {/* <MonthFilter data={data}/> */}
        <HoverImageLinksData data={data}/>
      </div>
  
    </div>
  );
}
