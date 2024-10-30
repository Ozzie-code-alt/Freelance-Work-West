import { connectMongo } from '@/lib/connection';
import Cultural from '@/models/cultural';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const culturalInfoResponse = await Cultural.findById({ _id: id });

  const culturalInfo = {
    userName: culturalInfoResponse.userName,
    sex: culturalInfoResponse.sex,
    cc1: culturalInfoResponse.cc1,
    cc2: culturalInfoResponse.cc2,
    cc3: culturalInfoResponse.cc3,
    sqd0: culturalInfoResponse.sqd0,
    sqd1: culturalInfoResponse.sqd1,
    sqd2: culturalInfoResponse.sqd2,
    sqd3: culturalInfoResponse.sqd3,
    sqd4: culturalInfoResponse.sqd4,
    sqd5: culturalInfoResponse.sqd5,
    sqd6: culturalInfoResponse.sqd6,
    sqd7: culturalInfoResponse.sqd7,
    sqd8: culturalInfoResponse.sqd8,
    mean: culturalInfoResponse.mean
  };
  return NextResponse.json({ culturalInfo }, { status: 200 });
}
