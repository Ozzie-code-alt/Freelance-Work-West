"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { BACcolumns } from "@/app/payments/BACColumns";
import { date } from "zod";
import Example from "@/components/Loader";

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

        setData(bacs); // Update the state with the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount


    console.log(data)


  if (!data.length) {
    return <div className="w-screen h-screen flex justify-center items-center "><Example/></div>;
  }


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={BACcolumns} data={data} />
    </div>
  );
}
