import { connectMongo } from '@/lib/connection';
import GeneralServices from '@/models/generalServices';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const generalServicesInfoResponse = await GeneralServices.findById({ _id: id });

  const generalServicesInfo = {
    userName: generalServicesInfoResponse.userName,
    sex: generalServicesInfoResponse.sex,
    cc1: generalServicesInfoResponse.cc1,
    cc2: generalServicesInfoResponse.cc2,
    cc3: generalServicesInfoResponse.cc3,
    sqd0: generalServicesInfoResponse.sqd0,
    sqd1: generalServicesInfoResponse.sqd1,
    sqd2: generalServicesInfoResponse.sqd2,
    sqd3: generalServicesInfoResponse.sqd3,
    sqd4: generalServicesInfoResponse.sqd4,
    sqd5: generalServicesInfoResponse.sqd5,
    sqd6: generalServicesInfoResponse.sqd6,
    sqd7: generalServicesInfoResponse.sqd7,
    sqd8: generalServicesInfoResponse.sqd8,
    mean: generalServicesInfoResponse.mean
  };
  return NextResponse.json({ generalServicesInfo }, { status: 200 });
}
