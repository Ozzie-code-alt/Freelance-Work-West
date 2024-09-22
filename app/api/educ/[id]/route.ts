import { connectMongo } from '@/lib/connection';
import EDUC from '@/models/educ';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { comment } from 'postcss';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const educInfoResponse = await EDUC.findById({ _id: id });

  const educInfo = {
    userName: educInfoResponse.userName,
    sex: educInfoResponse.sex,
    cc1: educInfoResponse.cc1,
    cc2: educInfoResponse.cc2,
    cc3: educInfoResponse.cc3,
    sqd0: educInfoResponse.sqd0,
    sqd1: educInfoResponse.sqd1,
    sqd2: educInfoResponse.sqd2,
    sqd3: educInfoResponse.sqd3,
    sqd4: educInfoResponse.sqd4,
    sqd5: educInfoResponse.sqd5,
    sqd6: educInfoResponse.sqd6,
    sqd7: educInfoResponse.sqd7,
    sqd8: educInfoResponse.sqd8,
    mean: educInfoResponse.mean,
    comments: educInfoResponse.comments
  };
  return NextResponse.json({ educInfo }, { status: 200 });
}
