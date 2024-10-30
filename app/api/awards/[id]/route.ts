import { connectMongo } from '@/lib/connection';
import Awards from '@/models/awards';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const awardsInfoResponse = await Awards.findById({ _id: id });

  const awardsInfo = {
    userName: awardsInfoResponse.userName,
    sex: awardsInfoResponse.sex,
    cc1: awardsInfoResponse.cc1,
    cc2: awardsInfoResponse.cc2,
    cc3: awardsInfoResponse.cc3,
    sqd0: awardsInfoResponse.sqd0,
    sqd1: awardsInfoResponse.sqd1,
    sqd2: awardsInfoResponse.sqd2,
    sqd3: awardsInfoResponse.sqd3,
    sqd4: awardsInfoResponse.sqd4,
    sqd5: awardsInfoResponse.sqd5,
    sqd6: awardsInfoResponse.sqd6,
    sqd7: awardsInfoResponse.sqd7,
    sqd8: awardsInfoResponse.sqd8,
    mean: awardsInfoResponse.mean
  };
  return NextResponse.json({ awardsInfo }, { status: 200 });
}
