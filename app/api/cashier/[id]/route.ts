
import { connectMongo } from "@/lib/connection";
import Cashier from "@/models/cashier";
import { NextResponse } from "next/server"

export async function GET(req, {params}){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const cashierInfo = await Cashier.findById({_id:id})
   return NextResponse.json({cashierInfo}, {status:200})
}