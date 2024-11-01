import { connectMongo } from '@/lib/connection';
import Research from '@/models/research';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const researchInfoResponse = await Research.findById({ _id: id });

  const researchInfo = {
    userName: researchInfoResponse.userName,
    sex: researchInfoResponse.sex,
    cc1: researchInfoResponse.cc1,
    cc2: researchInfoResponse.cc2,
    cc3: researchInfoResponse.cc3,
    sqd0: researchInfoResponse.sqd0,
    sqd1: researchInfoResponse.sqd1,
    sqd2: researchInfoResponse.sqd2,
    sqd3: researchInfoResponse.sqd3,
    sqd4: researchInfoResponse.sqd4,
    sqd5: researchInfoResponse.sqd5,
    sqd6: researchInfoResponse.sqd6,
    sqd7: researchInfoResponse.sqd7,
    sqd8: researchInfoResponse.sqd8,
    mean: researchInfoResponse.mean
  };
  return NextResponse.json({ researchInfo }, { status: 200 });
}
