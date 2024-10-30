import { connectMongo } from '@/lib/connection';
import MIS from '@/models/mis';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const misInfoResponse = await MIS.findById({ _id: id });

  const misInfo = {
    userName: misInfoResponse.userName,
    sex: misInfoResponse.sex,
    cc1: misInfoResponse.cc1,
    cc2: misInfoResponse.cc2,
    cc3: misInfoResponse.cc3,
    sqd0: misInfoResponse.sqd0,
    sqd1: misInfoResponse.sqd1,
    sqd2: misInfoResponse.sqd2,
    sqd3: misInfoResponse.sqd3,
    sqd4: misInfoResponse.sqd4,
    sqd5: misInfoResponse.sqd5,
    sqd6: misInfoResponse.sqd6,
    sqd7: misInfoResponse.sqd7,
    sqd8: misInfoResponse.sqd8,
    mean: misInfoResponse.mean
  };
  return NextResponse.json({ misInfo }, { status: 200 });
}
