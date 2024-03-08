"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { RecordsOfficeColumns } from "@/app/payments/RecordsOfficeColumns";
export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/recordsOffice");
        if (!res.ok) {
          throw new Error(
            `API call failed with status: ${res.status} ${res.statusText}`
          );
        }
        const jsonResponse = await res.json();
        console.log("Raw JSON Response:", jsonResponse);

        if (!jsonResponse.hasOwnProperty("recordsOfficeInfo")) {
          throw new Error(
            "Expected property Records Info not found in the response"
          );
        }

        const { recordsOfficeInfo } = jsonResponse;
        console.log("Records Office", recordsOfficeInfo);
        setData(recordsOfficeInfo); // Update the state with the fetched data
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
      <DataTable columns={RecordsOfficeColumns} data={data} />
    </div>
  );
}
