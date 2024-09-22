
import { connectMongo } from "@/lib/connection";
// import BAC from "@/models/bac";
import REGISTRAR from "@/models/registrar";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server"

export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params //we grab id from link - desctructure
    await connectMongo();
   const registrarInfoResponse = await REGISTRAR.findById({_id:id})


    const registrarInfo = {
    userName: registrarInfoResponse.userName,
    servicesReceived: registrarInfoResponse.servicesReceived,
    externalClient: registrarInfoResponse.externalClient,
    pointOfOrigin: registrarInfoResponse.pointOfOrigin,
    officeVisited:registrarInfoResponse.officeVisited,
    internalClient:registrarInfoResponse.internalClient,
    sex: registrarInfoResponse.sex,
    responsiveness:registrarInfoResponse.responsiveness,
    reliability:registrarInfoResponse.reliability,
    access: registrarInfoResponse.access,
    communication:registrarInfoResponse.communication,
    costs:registrarInfoResponse.costs,
    integrity:registrarInfoResponse.integrity,
    assurance:registrarInfoResponse.assurance,
    outcome:registrarInfoResponse.outcome,
    message:registrarInfoResponse.message,
    mean:registrarInfoResponse.mean
   }
   return NextResponse.json({registrarInfo}, {status:200})
}