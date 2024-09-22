import { connectMongo } from '@/lib/connection';
// import BAC from '@/models/bac';
import RMU from '@/models/rmu';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const rmuInfoResponse = await RMU.findById({ _id: id });

  const rmuInfo = {
    userName: rmuInfoResponse.userName,
    servicesReceived: rmuInfoResponse.servicesReceived,
    externalClient: rmuInfoResponse.externalClient,
    pointOfOrigin: rmuInfoResponse.pointOfOrigin,
    officeVisited: rmuInfoResponse.officeVisited,
    internalClient: rmuInfoResponse.internalClient,
    sex: rmuInfoResponse.sex,
    responsiveness: rmuInfoResponse.responsiveness,
    reliability: rmuInfoResponse.reliability,
    access: rmuInfoResponse.access,
    communication: rmuInfoResponse.communication,
    costs: rmuInfoResponse.costs,
    integrity: rmuInfoResponse.integrity,
    assurance: rmuInfoResponse.assurance,
    outcome: rmuInfoResponse.outcome,
    message: rmuInfoResponse.message,
    mean: rmuInfoResponse.mean
  };
  return NextResponse.json({ rmuInfo }, { status: 200 });
}
