import { connectMongo } from '@/lib/connection';
import PublicAffairs from '@/models/publicAffairs';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const publicaffairInfoResponse = await PublicAffairs.findById({ _id: id });

  const publicaffairInfo = {
    userName: publicaffairInfoResponse.userName,
    sex: publicaffairInfoResponse.sex,
    cc1: publicaffairInfoResponse.cc1,
    cc2: publicaffairInfoResponse.cc2,
    cc3: publicaffairInfoResponse.cc3,
    sqd0: publicaffairInfoResponse.sqd0,
    sqd1: publicaffairInfoResponse.sqd1,
    sqd2: publicaffairInfoResponse.sqd2,
    sqd3: publicaffairInfoResponse.sqd3,
    sqd4: publicaffairInfoResponse.sqd4,
    sqd5: publicaffairInfoResponse.sqd5,
    sqd6: publicaffairInfoResponse.sqd6,
    sqd7: publicaffairInfoResponse.sqd7,
    sqd8: publicaffairInfoResponse.sqd8,
    mean: publicaffairInfoResponse.mean
  };
  return NextResponse.json({ publicaffairInfo }, { status: 200 });
}
