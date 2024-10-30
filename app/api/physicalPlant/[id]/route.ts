import { connectMongo } from '@/lib/connection';
import PhysicalPlant from '@/models/physicalPlant';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const physicalPlantInfoResponse = await PhysicalPlant.findById({ _id: id });

  const physicalPlantInfo = {
    userName: physicalPlantInfoResponse.userName,
    sex: physicalPlantInfoResponse.sex,
    cc1: physicalPlantInfoResponse.cc1,
    cc2: physicalPlantInfoResponse.cc2,
    cc3: physicalPlantInfoResponse.cc3,
    sqd0: physicalPlantInfoResponse.sqd0,
    sqd1: physicalPlantInfoResponse.sqd1,
    sqd2: physicalPlantInfoResponse.sqd2,
    sqd3: physicalPlantInfoResponse.sqd3,
    sqd4: physicalPlantInfoResponse.sqd4,
    sqd5: physicalPlantInfoResponse.sqd5,
    sqd6: physicalPlantInfoResponse.sqd6,
    sqd7: physicalPlantInfoResponse.sqd7,
    sqd8: physicalPlantInfoResponse.sqd8,
    mean: physicalPlantInfoResponse.mean
  };
  return NextResponse.json({ physicalPlantInfo }, { status: 200 });
}
