import { connectMongo } from '@/lib/connection';
import AffairsOffice from '@/models/affairsOffice';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const affarisOfficeResponse = await AffairsOffice.findById({ _id: id });

  const affarisOfficeInfo = {
    userName: affarisOfficeResponse.userName,
    sex: affarisOfficeResponse.sex,
    cc1: affarisOfficeResponse.cc1,
    cc2: affarisOfficeResponse.cc2,
    cc3: affarisOfficeResponse.cc3,
    sqd0: affarisOfficeResponse.sqd0,
    sqd1: affarisOfficeResponse.sqd1,
    sqd2: affarisOfficeResponse.sqd2,
    sqd3: affarisOfficeResponse.sqd3,
    sqd4: affarisOfficeResponse.sqd4,
    sqd5: affarisOfficeResponse.sqd5,
    sqd6: affarisOfficeResponse.sqd6,
    sqd7: affarisOfficeResponse.sqd7,
    sqd8: affarisOfficeResponse.sqd8,
    mean: affarisOfficeResponse.mean
  };
  return NextResponse.json({ affarisOfficeInfo }, { status: 200 });
}
