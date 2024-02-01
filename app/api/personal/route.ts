import { connectMongo } from "@/lib/connection";
import PersonalInformation from "@/models/personalInformation";
import { NextResponse } from "next/server";


export async function POST(req){
    try {
        const {date, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex} = await req.json(); 
        await connectMongo();
        await PersonalInformation.create({date, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex })
        console.log("Personal Information Sent")
        return NextResponse.json({message:"Personal Information Sent"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"An Error Occured While Sending Personal Informaton"},{status:500})
    }
}

export async function GET(){
    try {
        await connectMongo()
            const personalInfo = await PersonalInformation.find()
            return NextResponse.json({personalInfo}) 
    } catch (error) {
        return NextResponse.json({message:"An error Occured while Getting Personal Informaiton"},{status:500})
    }
}