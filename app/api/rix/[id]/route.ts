import { connectMongo } from '@/lib/connection';
// import BAC from '@/models/bac';
import RIX from '@/models/rix';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const rixInfoResponse = await RIX.findById({ _id: id });

  const rixInfo = {
    userName: rixInfoResponse.userName,
    servicesReceived: rixInfoResponse.servicesReceived,
    externalClient: rixInfoResponse.externalClient,
    pointOfOrigin: rixInfoResponse.pointOfOrigin,
    officeVisited: rixInfoResponse.officeVisited,
    internalClient: rixInfoResponse.internalClient,
    sex: rixInfoResponse.sex,
    responsiveness: rixInfoResponse.responsiveness,
    reliability: rixInfoResponse.reliability,
    access: rixInfoResponse.access,
    communication: rixInfoResponse.communication,
    costs: rixInfoResponse.costs,
    integrity: rixInfoResponse.integrity,
    assurance: rixInfoResponse.assurance,
    outcome: rixInfoResponse.outcome,
    message: rixInfoResponse.message,
    mean: rixInfoResponse.mean
  };
  return NextResponse.json({ rixInfo }, { status: 200 });
}
