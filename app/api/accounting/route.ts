import { connectMongo } from "@/lib/connection";
import Accounting from "@/models/accounting";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const {date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex, reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message} = await req.json(); 
        await connectMongo();
        await Accounting.create({date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex ,reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message})
        console.log("Accounting Information Sent")
        return NextResponse.json({message:"Accounting Information Sent"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"An Error Occured While Sending Accounting Informaton"},{status:500})
    }
}

export async function GET(){
        await connectMongo()
            const accounting = await Accounting.find()
            console.log("Logg BAC Information",accounting)
            return NextResponse.json({accounting}) 
}