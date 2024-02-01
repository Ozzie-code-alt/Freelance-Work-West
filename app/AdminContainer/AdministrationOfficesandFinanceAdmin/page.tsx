"use client"
import { DataTable } from "@/app/payments/data-table"
import { Payment, columns } from "@/app/payments/columns"
import { NextResponse } from "next/server"
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.

try {
  const res = await fetch("/api/")
} catch (error) {
  return NextResponse.json({message:"Error in Fetching data From API"} ,{status:500})
}


}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
