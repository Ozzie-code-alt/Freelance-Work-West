import { connectMongo } from '@/lib/connection';
import SOICT from '@/models/soict';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const soictInfoResponse = await SOICT.findById({ _id: id });

  const soictInfo = {
    userName: soictInfoResponse.userName,
    sex: soictInfoResponse.sex,
    cc1: soictInfoResponse.cc1,
    cc2: soictInfoResponse.cc2,
    cc3: soictInfoResponse.cc3,
    sqd0: soictInfoResponse.sqd0,
    sqd1: soictInfoResponse.sqd1,
    sqd2: soictInfoResponse.sqd2,
    sqd3: soictInfoResponse.sqd3,
    sqd4: soictInfoResponse.sqd4,
    sqd5: soictInfoResponse.sqd5,
    sqd6: soictInfoResponse.sqd6,
    sqd7: soictInfoResponse.sqd7,
    sqd8: soictInfoResponse.sqd8,
    mean: soictInfoResponse.mean
  };
  return NextResponse.json({ soictInfo }, { status: 200 });
}
