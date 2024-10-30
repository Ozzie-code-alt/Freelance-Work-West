import { connectMongo } from '@/lib/connection';
import PublicAffairs from '@/models/publicAffairs';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const publicAffairInfoResponse = await PublicAffairs.findById({ _id: id });

  const publicAffairInfo = {
    userName: publicAffairInfoResponse.userName,
    sex: publicAffairInfoResponse.sex,
    cc1: publicAffairInfoResponse.cc1,
    cc2: publicAffairInfoResponse.cc2,
    cc3: publicAffairInfoResponse.cc3,
    sqd0: publicAffairInfoResponse.sqd0,
    sqd1: publicAffairInfoResponse.sqd1,
    sqd2: publicAffairInfoResponse.sqd2,
    sqd3: publicAffairInfoResponse.sqd3,
    sqd4: publicAffairInfoResponse.sqd4,
    sqd5: publicAffairInfoResponse.sqd5,
    sqd6: publicAffairInfoResponse.sqd6,
    sqd7: publicAffairInfoResponse.sqd7,
    sqd8: publicAffairInfoResponse.sqd8,
    mean: publicAffairInfoResponse.mean
  };
  return NextResponse.json({ publicAffairInfo }, { status: 200 });
}
