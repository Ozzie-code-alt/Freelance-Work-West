import { connectMongo } from '@/lib/connection';
// import BAC from '@/models/bac';
import SBM from '@/models/sbm';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const sbmInfoResponse = await SBM.findById({ _id: id });

  const sbmInfo = {
    userName: sbmInfoResponse.userName,
    servicesReceived: sbmInfoResponse.servicesReceived,
    externalClient: sbmInfoResponse.externalClient,
    pointOfOrigin: sbmInfoResponse.pointOfOrigin,
    officeVisited: sbmInfoResponse.officeVisited,
    internalClient: sbmInfoResponse.internalClient,
    sex: sbmInfoResponse.sex,
    responsiveness: sbmInfoResponse.responsiveness,
    reliability: sbmInfoResponse.reliability,
    access: sbmInfoResponse.access,
    communication: sbmInfoResponse.communication,
    costs: sbmInfoResponse.costs,
    integrity: sbmInfoResponse.integrity,
    assurance: sbmInfoResponse.assurance,
    outcome: sbmInfoResponse.outcome,
    message: sbmInfoResponse.message,
    mean: sbmInfoResponse.mean
  };
  return NextResponse.json({ sbmInfo }, { status: 200 });
}
