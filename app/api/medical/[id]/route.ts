
import { connectMongo } from "@/lib/connection";
import { NextResponse } from "next/server"
import { NextApiRequest } from "next";
import Medical from "@/models/medical";

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const medicalInfo = await Medical.findById({_id:id})
   return NextResponse.json({medicalInfo}, {status:200})
}