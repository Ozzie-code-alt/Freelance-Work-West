import { connectMongo } from "@/lib/connection";
import OSA from "@/models/osa";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function POST(req:NextApiRequest){
    try {
        //@ts-ignore
        const {date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex, reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message , mean} = await req.json(); 
        await connectMongo();
        await OSA.create({date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex ,reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message , mean})
        console.log("OSA Information Sent")
        return NextResponse.json({message:"OSA Information Sent"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"An Error Occured While Sending OSA Informaton"},{status:500})
    }
}

export async function GET(){
        await connectMongo()
            const osas = await OSA.find()
            console.log("Logg OSA Information",osas)
            return NextResponse.json({osas}) 
}