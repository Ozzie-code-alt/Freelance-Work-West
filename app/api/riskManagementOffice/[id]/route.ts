import { connectMongo } from '@/lib/connection';
import RMO from '@/models/rmo';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const rmoInfoResponse = await RMO.findById({ _id: id });

  const rmoInfo = {
    userName: rmoInfoResponse.userName,
    sex: rmoInfoResponse.sex,
    cc1: rmoInfoResponse.cc1,
    cc2: rmoInfoResponse.cc2,
    cc3: rmoInfoResponse.cc3,
    sqd0: rmoInfoResponse.sqd0,
    sqd1: rmoInfoResponse.sqd1,
    sqd2: rmoInfoResponse.sqd2,
    sqd3: rmoInfoResponse.sqd3,
    sqd4: rmoInfoResponse.sqd4,
    sqd5: rmoInfoResponse.sqd5,
    sqd6: rmoInfoResponse.sqd6,
    sqd7: rmoInfoResponse.sqd7,
    sqd8: rmoInfoResponse.sqd8,
    mean: rmoInfoResponse.mean
  };
  return NextResponse.json({ rmoInfo }, { status: 200 });
}
