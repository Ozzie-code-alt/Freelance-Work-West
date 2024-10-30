import { connectMongo } from '@/lib/connection';
import GenderDevelopment from '@/models/genderDevelopment';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const genderDevelopmentInfoResponse = await GenderDevelopment.findById({ _id: id });

  const genderDevelopmentInfo = {
    userName: genderDevelopmentInfoResponse.userName,
    sex: genderDevelopmentInfoResponse.sex,
    cc1: genderDevelopmentInfoResponse.cc1,
    cc2: genderDevelopmentInfoResponse.cc2,
    cc3: genderDevelopmentInfoResponse.cc3,
    sqd0: genderDevelopmentInfoResponse.sqd0,
    sqd1: genderDevelopmentInfoResponse.sqd1,
    sqd2: genderDevelopmentInfoResponse.sqd2,
    sqd3: genderDevelopmentInfoResponse.sqd3,
    sqd4: genderDevelopmentInfoResponse.sqd4,
    sqd5: genderDevelopmentInfoResponse.sqd5,
    sqd6: genderDevelopmentInfoResponse.sqd6,
    sqd7: genderDevelopmentInfoResponse.sqd7,
    sqd8: genderDevelopmentInfoResponse.sqd8,
    mean: genderDevelopmentInfoResponse.mean
  };
  return NextResponse.json({ genderDevelopmentInfo }, { status: 200 });
}
