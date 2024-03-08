
import { connectMongo } from "@/lib/connection";
import { NextResponse } from "next/server"
import { NextApiRequest } from "next";
import OSA from "@/models/osa";

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const osaInfo = await OSA.findById({_id:id})
   return NextResponse.json({osaInfo}, {status:200})
}