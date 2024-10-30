import { connectMongo } from '@/lib/connection';
import Security from '@/models/security';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const securityInfoResponse = await Security.findById({ _id: id });

  const securityInfo = {
    userName: securityInfoResponse.userName,
    sex: securityInfoResponse.sex,
    cc1: securityInfoResponse.cc1,
    cc2: securityInfoResponse.cc2,
    cc3: securityInfoResponse.cc3,
    sqd0: securityInfoResponse.sqd0,
    sqd1: securityInfoResponse.sqd1,
    sqd2: securityInfoResponse.sqd2,
    sqd3: securityInfoResponse.sqd3,
    sqd4: securityInfoResponse.sqd4,
    sqd5: securityInfoResponse.sqd5,
    sqd6: securityInfoResponse.sqd6,
    sqd7: securityInfoResponse.sqd7,
    sqd8: securityInfoResponse.sqd8,
    mean: securityInfoResponse.mean
  };
  return NextResponse.json({ securityInfo }, { status: 200 });
}
