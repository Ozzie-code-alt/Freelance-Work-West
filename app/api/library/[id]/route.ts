import { connectMongo } from '@/lib/connection';
import LIBRARY from '@/models/library';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const libraryInfoResponse = await LIBRARY.findById({ _id: id });

  const libraryInfo = {
    userName: libraryInfoResponse.userName,
    servicesReceived: libraryInfoResponse.servicesReceived,
    externalClient: libraryInfoResponse.externalClient,
    pointOfOrigin: libraryInfoResponse.pointOfOrigin,
    officeVisited: libraryInfoResponse.officeVisited,
    internalClient: libraryInfoResponse.internalClient,
    sex: libraryInfoResponse.sex,
    responsiveness: libraryInfoResponse.responsiveness,
    reliability: libraryInfoResponse.reliability,
    access: libraryInfoResponse.access,
    communication: libraryInfoResponse.communication,
    costs: libraryInfoResponse.costs,
    integrity: libraryInfoResponse.integrity,
    assurance: libraryInfoResponse.assurance,
    outcome: libraryInfoResponse.outcome,
    message: libraryInfoResponse.message,
    mean: libraryInfoResponse.mean
  };
  return NextResponse.json({ libraryInfo }, { status: 200 });
}
