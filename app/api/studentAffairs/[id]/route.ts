import { connectMongo } from '@/lib/connection';
import StudentAffairs from '@/models/studentAffairs';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const studentAffairsInfoResponse = await StudentAffairs.findById({ _id: id });

  const studentAffairsInfo = {
    userName: studentAffairsInfoResponse.userName,
    sex: studentAffairsInfoResponse.sex,
    cc1: studentAffairsInfoResponse.cc1,
    cc2: studentAffairsInfoResponse.cc2,
    cc3: studentAffairsInfoResponse.cc3,
    sqd0: studentAffairsInfoResponse.sqd0,
    sqd1: studentAffairsInfoResponse.sqd1,
    sqd2: studentAffairsInfoResponse.sqd2,
    sqd3: studentAffairsInfoResponse.sqd3,
    sqd4: studentAffairsInfoResponse.sqd4,
    sqd5: studentAffairsInfoResponse.sqd5,
    sqd6: studentAffairsInfoResponse.sqd6,
    sqd7: studentAffairsInfoResponse.sqd7,
    sqd8: studentAffairsInfoResponse.sqd8,
    mean: studentAffairsInfoResponse.mean
  };
  return NextResponse.json({ studentAffairsInfo }, { status: 200 });
}
