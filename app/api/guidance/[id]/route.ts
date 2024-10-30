import { connectMongo } from '@/lib/connection';
import Guidance from '@/models/guidance';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const guidanceResponse = await Guidance.findById({ _id: id });

  const guidance = {
    userName: guidanceResponse.userName,
    sex: guidanceResponse.sex,
    cc1: guidanceResponse.cc1,
    cc2: guidanceResponse.cc2,
    cc3: guidanceResponse.cc3,
    sqd0: guidanceResponse.sqd0,
    sqd1: guidanceResponse.sqd1,
    sqd2: guidanceResponse.sqd2,
    sqd3: guidanceResponse.sqd3,
    sqd4: guidanceResponse.sqd4,
    sqd5: guidanceResponse.sqd5,
    sqd6: guidanceResponse.sqd6,
    sqd7: guidanceResponse.sqd7,
    sqd8: guidanceResponse.sqd8,
    mean: guidanceResponse.mean
  };
  return NextResponse.json({ guidance }, { status: 200 });
}
