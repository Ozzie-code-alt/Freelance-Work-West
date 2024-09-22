import { connectMongo } from '@/lib/connection';
// import BAC from "@/models/bac";
import SupplyBuilding from '@/models/supplyBuilding';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const supplyBuildingInfoResponse = await SupplyBuilding.findById({ _id: id });

  const supplyBuildingInfo = {
    userName: supplyBuildingInfoResponse.userName,
    servicesReceived: supplyBuildingInfoResponse.servicesReceived,
    externalClient: supplyBuildingInfoResponse.externalClient,
    pointOfOrigin: supplyBuildingInfoResponse.pointOfOrigin,
    officeVisited: supplyBuildingInfoResponse.officeVisited,
    internalClient: supplyBuildingInfoResponse.internalClient,
    sex: supplyBuildingInfoResponse.sex,
    responsiveness: supplyBuildingInfoResponse.responsiveness,
    reliability: supplyBuildingInfoResponse.reliability,
    access: supplyBuildingInfoResponse.access,
    communication: supplyBuildingInfoResponse.communication,
    costs: supplyBuildingInfoResponse.costs,
    integrity: supplyBuildingInfoResponse.integrity,
    assurance: supplyBuildingInfoResponse.assurance,
    outcome: supplyBuildingInfoResponse.outcome,
    message: supplyBuildingInfoResponse.message,
    mean: supplyBuildingInfoResponse.mean
  };
  return NextResponse.json({ supplyBuildingInfo }, { status: 200 });
}
