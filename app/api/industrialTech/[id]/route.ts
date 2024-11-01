
import { connectMongo } from "@/lib/connection";
import IndustrialTech from "@/models/industrialTech";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params //we grab id from link - desctructure
    await connectMongo();
   const industrialTechInfoResponse = await IndustrialTech.findById({_id:id})


    const industrialTechInfo = {
    userName: industrialTechInfoResponse.userName,
    servicesReceived: industrialTechInfoResponse.servicesReceived,
    externalClient: industrialTechInfoResponse.externalClient,
    pointOfOrigin: industrialTechInfoResponse.pointOfOrigin,
    officeVisited:industrialTechInfoResponse.officeVisited,
    internalClient:industrialTechInfoResponse.internalClient,
    sex: industrialTechInfoResponse.sex,
    responsiveness:industrialTechInfoResponse.responsiveness,
    reliability:industrialTechInfoResponse.reliability,
    access: industrialTechInfoResponse.access,
    communication:industrialTechInfoResponse.communication,
    costs:industrialTechInfoResponse.costs,
    integrity:industrialTechInfoResponse.integrity,
    assurance:industrialTechInfoResponse.assurance,
    outcome:industrialTechInfoResponse.outcome,
    message:industrialTechInfoResponse.message,
    mean:industrialTechInfoResponse.mean
   }
   return NextResponse.json({industrialTechInfo}, {status:200})
}