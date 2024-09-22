
import { connectMongo } from "@/lib/connection";
// import BAC from "@/models/bac";
import sportsOffice from "@/models/sportsOffice";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params //we grab id from link - desctructure
    await connectMongo();
   const sportsOfficeInfoResponse = await sportsOffice.findById({_id:id})


    const sportsOfficeInfo = {
    userName: sportsOfficeInfoResponse.userName,
    servicesReceived: sportsOfficeInfoResponse.servicesReceived,
    externalClient: sportsOfficeInfoResponse.externalClient,
    pointOfOrigin: sportsOfficeInfoResponse.pointOfOrigin,
    officeVisited:sportsOfficeInfoResponse.officeVisited,
    internalClient:sportsOfficeInfoResponse.internalClient,
    sex: sportsOfficeInfoResponse.sex,
    responsiveness:sportsOfficeInfoResponse.responsiveness,
    reliability:sportsOfficeInfoResponse.reliability,
    access: sportsOfficeInfoResponse.access,
    communication:sportsOfficeInfoResponse.communication,
    costs:sportsOfficeInfoResponse.costs,
    integrity:sportsOfficeInfoResponse.integrity,
    assurance:sportsOfficeInfoResponse.assurance,
    outcome:sportsOfficeInfoResponse.outcome,
    message:sportsOfficeInfoResponse.message,
    mean:sportsOfficeInfoResponse.mean
   }
   return NextResponse.json({sportsOfficeInfo}, {status:200})
}