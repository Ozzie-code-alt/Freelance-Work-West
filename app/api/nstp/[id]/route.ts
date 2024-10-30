import { connectMongo } from '@/lib/connection';
import NSTP from '@/models/nstp';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const nstpInfoResponse = await NSTP.findById({ _id: id });

  const nstpInfo = {
    userName: nstpInfoResponse.userName,
    sex: nstpInfoResponse.sex,
    cc1: nstpInfoResponse.cc1,
    cc2: nstpInfoResponse.cc2,
    cc3: nstpInfoResponse.cc3,
    sqd0: nstpInfoResponse.sqd0,
    sqd1: nstpInfoResponse.sqd1,
    sqd2: nstpInfoResponse.sqd2,
    sqd3: nstpInfoResponse.sqd3,
    sqd4: nstpInfoResponse.sqd4,
    sqd5: nstpInfoResponse.sqd5,
    sqd6: nstpInfoResponse.sqd6,
    sqd7: nstpInfoResponse.sqd7,
    sqd8: nstpInfoResponse.sqd8,
    mean: nstpInfoResponse.mean
  };
  return NextResponse.json({ nstpInfo }, { status: 200 });
}
