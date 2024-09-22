
import { connectMongo } from "@/lib/connection";
// import BAC from "@/models/bac";
import PDU from "@/models/pdu";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params //we grab id from link - desctructure
    await connectMongo();
   const pduInfoResponse = await PDU.findById({_id:id})


    const pduInfo = {
    userName: pduInfoResponse.userName,
    servicesReceived: pduInfoResponse.servicesReceived,
    externalClient: pduInfoResponse.externalClient,
    pointOfOrigin: pduInfoResponse.pointOfOrigin,
    officeVisited:pduInfoResponse.officeVisited,
    internalClient:pduInfoResponse.internalClient,
    sex: pduInfoResponse.sex,
    responsiveness:pduInfoResponse.responsiveness,
    reliability:pduInfoResponse.reliability,
    access: pduInfoResponse.access,
    communication:pduInfoResponse.communication,
    costs:pduInfoResponse.costs,
    integrity:pduInfoResponse.integrity,
    assurance:pduInfoResponse.assurance,
    outcome:pduInfoResponse.outcome,
    message:pduInfoResponse.message,
    mean:pduInfoResponse.mean
   }
   return NextResponse.json({pduInfo}, {status:200})
}