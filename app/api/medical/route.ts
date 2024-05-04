import { connectMongo } from "@/lib/connection";
import Medical from "@/models/medical";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function POST(req:NextApiRequest){
    try {
        //@ts-ignore
        const {date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex, reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message ,  mean} = await req.json(); 
        await connectMongo();
        await Medical.create({date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex ,reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message , mean})
        console.log("Medical Information Sent")
        return NextResponse.json({message:"Medical Information Sent"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"An Error Occured While Sending Medical Informaton"},{status:500})
    }
}

export async function GET(){
        await connectMongo()
            const medicals = await Medical.find()
            console.log("Logg BAC Information",medicals)
            const medicalCOnverted = medicals.map((medData) =>({
              ...medData._doc,
                date: medData.date.toISOString().split("T")[0]  
            }))
            return NextResponse.json({medicals:medicalCOnverted}, {status:200}) 
}