"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { OSAColumns } from "@/app/payments/OSAColumns";
export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/osa");
        if (!res.ok) {
          throw new Error(
            `API call failed with status: ${res.status} ${res.statusText}`
          );
        }
        const jsonResponse = await res.json();
        console.log("Raw JSON Response:", jsonResponse);

        if (!jsonResponse.hasOwnProperty("osas")) {
          throw new Error(
            "Expected property Medicals not found in the response"
          );
        }

        const { osas } = jsonResponse;
        console.log("This is Cashiers Info", osas);
        setData(osas); // Update the state with the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount


    console.log(data)
  if (!data.length) {
    console.log(data.length)
    return <div>Loading...</div>;
  }


  return (
    <div className="container mx-auto py-10">
      <DataTable columns={OSAColumns} data={data} />
    </div>
  );
}
