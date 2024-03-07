
import { connectMongo } from "@/lib/connection";
import Cashier from "@/models/cashier";
import { NextResponse } from "next/server"
import { NextApiRequest } from "next";

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const cashierInfo = await Cashier.findById({_id:id})
   return NextResponse.json({cashierInfo}, {status:200})
}