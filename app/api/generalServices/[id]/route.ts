import { connectMongo } from '@/lib/connection';
import BAC from '@/models/bac';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const bacInfoResponse = await BAC.findById({ _id: id });

  const bacInfo = {
    userName: bacInfoResponse.userName,
    sex: bacInfoResponse.sex,
    cc1: bacInfoResponse.cc1,
    cc2: bacInfoResponse.cc2,
    cc3: bacInfoResponse.cc3,
    sqd0: bacInfoResponse.sqd0,
    sqd1: bacInfoResponse.sqd1,
    sqd2: bacInfoResponse.sqd2,
    sqd3: bacInfoResponse.sqd3,
    sqd4: bacInfoResponse.sqd4,
    sqd5: bacInfoResponse.sqd5,
    sqd6: bacInfoResponse.sqd6,
    sqd7: bacInfoResponse.sqd7,
    sqd8: bacInfoResponse.sqd8,
    mean: bacInfoResponse.mean
  };
  return NextResponse.json({ bacInfo }, { status: 200 });
}
