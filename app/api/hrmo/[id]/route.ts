import { connectMongo } from '@/lib/connection';
import HRMO from '@/models/hrmo';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const hrmoResponse = await HRMO.findById({ _id: id });

  const hrmoInfo = {
    userName: hrmoResponse.userName,
    sex: hrmoResponse.sex,
    cc1: hrmoResponse.cc1,
    cc2: hrmoResponse.cc2,
    cc3: hrmoResponse.cc3,
    sqd0: hrmoResponse.sqd0,
    sqd1: hrmoResponse.sqd1,
    sqd2: hrmoResponse.sqd2,
    sqd3: hrmoResponse.sqd3,
    sqd4: hrmoResponse.sqd4,
    sqd5: hrmoResponse.sqd5,
    sqd6: hrmoResponse.sqd6,
    sqd7: hrmoResponse.sqd7,
    sqd8: hrmoResponse.sqd8,
    mean: hrmoResponse.mean
  };
  return NextResponse.json({ hrmoInfo }, { status: 200 });
}
