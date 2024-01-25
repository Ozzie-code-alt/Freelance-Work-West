import { connectMongo } from "@/lib/connection";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(req){
    try {
           const {name, email, password} = await req.json(); 
            const hashedPassword = await bcrypt.hash(password, 10) //Hash Password for security
           await connectMongo();
           await User.create({name, email, password: hashedPassword})
           
           console.log("Works")
           return NextResponse.json({message:"User Registered"},{status:201})
    } catch (error) {
       return NextResponse.json({message:"An error occured while registering the user"},{status:500})
    }
}