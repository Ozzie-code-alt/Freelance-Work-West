import { connectMongo } from '@/lib/connection';
import Alumni from '@/models/alumni';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const alumniInfoResponse = await Alumni.findById({ _id: id });

  const alumniInfo = {
    userName: alumniInfoResponse.userName,
    sex: alumniInfoResponse.sex,
    cc1: alumniInfoResponse.cc1,
    cc2: alumniInfoResponse.cc2,
    cc3: alumniInfoResponse.cc3,
    sqd0: alumniInfoResponse.sqd0,
    sqd1: alumniInfoResponse.sqd1,
    sqd2: alumniInfoResponse.sqd2,
    sqd3: alumniInfoResponse.sqd3,
    sqd4: alumniInfoResponse.sqd4,
    sqd5: alumniInfoResponse.sqd5,
    sqd6: alumniInfoResponse.sqd6,
    sqd7: alumniInfoResponse.sqd7,
    sqd8: alumniInfoResponse.sqd8,
    mean: alumniInfoResponse.mean
  };
  return NextResponse.json({ alumniInfo }, { status: 200 });
}
