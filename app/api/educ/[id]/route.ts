
import { connectMongo } from "@/lib/connection";
// import BAC from "@/models/bac";
import EDUC from "@/models/educ"
import { NextApiRequest } from "next";
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params //we grab id from link - desctructure
    await connectMongo();
   const educInfoResponse = await EDUC.findById({_id:id})


    const educInfo = {
    userName: educInfoResponse.userName,
    servicesReceived: educInfoResponse.servicesReceived,
    externalClient: educInfoResponse.externalClient,
    pointOfOrigin: educInfoResponse.pointOfOrigin,
    officeVisited:educInfoResponse.officeVisited,
    internalClient:educInfoResponse.internalClient,
    sex: educInfoResponse.sex,
    responsiveness:educInfoResponse.responsiveness,
    reliability:educInfoResponse.reliability,
    access: educInfoResponse.access,
    communication:educInfoResponse.communication,
    costs:educInfoResponse.costs,
    integrity:educInfoResponse.integrity,
    assurance:educInfoResponse.assurance,
    outcome:educInfoResponse.outcome,
    message:educInfoResponse.message,
    mean:educInfoResponse.mean
   }
   return NextResponse.json({educInfo}, {status:200})
}