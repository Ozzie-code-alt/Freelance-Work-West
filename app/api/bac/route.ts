import { connectMongo } from "@/lib/connection";
import BAC from "@/models/bac";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const {date, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex} = await req.json(); 
        await connectMongo();
        await BAC.create({date, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex })
        console.log("BAC Information Sent")
        return NextResponse.json({message:"BAC Information Sent"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"An Error Occured While Sending Personal Informaton"},{status:500})
    }
}

export async function GET(){
        await connectMongo()
            const bacs = await BAC.find()
            console.log("Logg BAC Information",bacs)
            return NextResponse.json({bacs}) 
}