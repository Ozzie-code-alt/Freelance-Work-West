"use client";
import { useState, useEffect } from "react";
import { DataTable } from "@/app/payments/data-table";
import { columns } from "@/app/payments/columns";

export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/personal");
        if (!res.ok) {
          throw new Error(
            `API call failed with status: ${res.status} ${res.statusText}`
          );
        }
        const jsonResponse = await res.json();
        console.log("Raw JSON Response:", jsonResponse);

        if (!jsonResponse.hasOwnProperty("personalInfo")) {
          throw new Error(
            "Expected property personalInfo not found in the response"
          );
        }

        const { personalInfo } = jsonResponse;
        console.log("This is Personal Info", personalInfo);
        setData(personalInfo); // Update the state with the fetched data
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
