
import { connectMongo } from "@/lib/connection";

import RecordsOffice from "@/models/recordsOffice";
import { NextResponse } from "next/server"
import { NextApiRequest } from "next";
export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const recordsInfo = await RecordsOffice.findById({_id:id})
   return NextResponse.json({recordsInfo}, {status:200})
}