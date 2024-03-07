
import { connectMongo } from "@/lib/connection";
import Accounting from "@/models/accounting";
import { NextResponse } from "next/server"
import { NextApiRequest } from "next";

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const accountingInfo = await Accounting.findById({_id:id})
   return NextResponse.json({accountingInfo}, {status:200})
}