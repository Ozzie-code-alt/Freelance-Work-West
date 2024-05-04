import { connectMongo } from "@/lib/connection";
import BAC from "@/models/bac";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function POST(req:NextApiRequest){
    try {
        //@ts-ignore
        const {date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex, reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message, mean} = await req.json(); 
        await connectMongo();
        await BAC.create({date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex ,reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message, mean})
        console.log("BAC Information Sent")
        return NextResponse.json({message:"BAC Information Sent it work now"}, {status:201})


    } catch (error) {
        return NextResponse.json({message:"An Error Occured While Sending Personal Informaton"},{status:500})
    }
}

export async function GET(){
        await connectMongo()
            const bacs = await BAC.find()
            console.log("Logg BAC Information",bacs)
            const dateConverted = bacs.map(bac => ({
                    ...bac._doc,
                   date: bac.date.toISOString().split("T")[0]
            }))
            return NextResponse.json({bacs:dateConverted}, {status:200}) 
}