"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { BACcolumns } from "@/app/payments/BACColumns";
import { Cashiercolumns } from "@/app/payments/CashierColumns";
import Example from "@/components/Loader";
export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/cashier");
        if (!res.ok) {
          throw new Error(
            `API call failed with status: ${res.status} ${res.statusText}`
          );
        }
        const jsonResponse = await res.json();
        console.log("Raw JSON Response:", jsonResponse);

        if (!jsonResponse.hasOwnProperty("cashiers")) {
          throw new Error(
            "Expected property bac not found in the response"
          );
        }

        const { cashiers } = jsonResponse;
        console.log("This is Cashiers Info", cashiers);
        setData(cashiers); // Update the state with the fetched data
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
      <DataTable columns={Cashiercolumns} data={data} />
    </div>
  );
}
