
import { connectMongo } from "@/lib/connection";
import BAC from "@/models/bac";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params //we grab id from link - desctructure
    await connectMongo();
   const bacInfoResponse = await BAC.findById({_id:id})


    const bacInfo = {
    userName: bacInfoResponse.userName,
    servicesReceived: bacInfoResponse.servicesReceived,
    externalClient: bacInfoResponse.externalClient,
    pointOfOrigin: bacInfoResponse.pointOfOrigin,
    officeVisited:bacInfoResponse.officeVisited,
    internalClient:bacInfoResponse.internalClient,
    sex: bacInfoResponse.sex,
    responsiveness:bacInfoResponse.responsiveness,
    reliability:bacInfoResponse.reliability,
    access: bacInfoResponse.access,
    communication:bacInfoResponse.communication,
    costs:bacInfoResponse.costs,
    integrity:bacInfoResponse.integrity,
    assurance:bacInfoResponse.assurance,
    outcome:bacInfoResponse.outcome,
    message:bacInfoResponse.message,
    mean:bacInfoResponse.mean
   }
   return NextResponse.json({bacInfo}, {status:200})
}