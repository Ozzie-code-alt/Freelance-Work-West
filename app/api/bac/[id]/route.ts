
import { connectMongo } from "@/lib/connection";
import BAC from "@/models/bac";
import { NextResponse } from "next/server"

export async function GET(req, {params}){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const bacInfo = await BAC.findById({_id:id})
   return NextResponse.json({bacInfo}, {status:200})
}