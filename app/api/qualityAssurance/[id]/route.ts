import { connectMongo } from '@/lib/connection';
import QualityAssurance from '@/models/qualityAssurance';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const qualityAssuranceInfoResponse = await QualityAssurance.findById({ _id: id });

  const qualityAssuranceInfo = {
    userName: qualityAssuranceInfoResponse.userName,
    sex: qualityAssuranceInfoResponse.sex,
    cc1: qualityAssuranceInfoResponse.cc1,
    cc2: qualityAssuranceInfoResponse.cc2,
    cc3: qualityAssuranceInfoResponse.cc3,
    sqd0: qualityAssuranceInfoResponse.sqd0,
    sqd1: qualityAssuranceInfoResponse.sqd1,
    sqd2: qualityAssuranceInfoResponse.sqd2,
    sqd3: qualityAssuranceInfoResponse.sqd3,
    sqd4: qualityAssuranceInfoResponse.sqd4,
    sqd5: qualityAssuranceInfoResponse.sqd5,
    sqd6: qualityAssuranceInfoResponse.sqd6,
    sqd7: qualityAssuranceInfoResponse.sqd7,
    sqd8: qualityAssuranceInfoResponse.sqd8,
    mean: qualityAssuranceInfoResponse.mean
  };
  return NextResponse.json({ qualityAssuranceInfo }, { status: 200 });
}
