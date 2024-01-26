import { connectMongo } from "@/lib/connection";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req){
    // we check if we have the same name in database

    try {
    await connectMongo()
    const {email} = await req.json() 

    const user = await User.findOne({email}).select("_id")
    console.log(user)
    return NextResponse.json({user})
    } catch (error) {
        console.log(error)
    }
}