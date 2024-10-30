import { connectMongo } from '@/lib/connection';
import SOBM from '@/models/sobm';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const sobmInfoResponse = await SOBM.findById({ _id: id });

  const sobmInfo = {
    userName: sobmInfoResponse.userName,
    sex: sobmInfoResponse.sex,
    cc1: sobmInfoResponse.cc1,
    cc2: sobmInfoResponse.cc2,
    cc3: sobmInfoResponse.cc3,
    sqd0: sobmInfoResponse.sqd0,
    sqd1: sobmInfoResponse.sqd1,
    sqd2: sobmInfoResponse.sqd2,
    sqd3: sobmInfoResponse.sqd3,
    sqd4: sobmInfoResponse.sqd4,
    sqd5: sobmInfoResponse.sqd5,
    sqd6: sobmInfoResponse.sqd6,
    sqd7: sobmInfoResponse.sqd7,
    sqd8: sobmInfoResponse.sqd8,
    mean: sobmInfoResponse.mean
  };
  return NextResponse.json({ sobmInfo }, { status: 200 });
}
