import { connectMongo } from '@/lib/connection';
import CampusAdmin from '@/models/campusAdmin';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const campusAdminInfoResponse = await CampusAdmin.findById({ _id: id });

  const campusAdminInfo = {
    userName: campusAdminInfoResponse.userName,
    sex: campusAdminInfoResponse.sex,
    cc1: campusAdminInfoResponse.cc1,
    cc2: campusAdminInfoResponse.cc2,
    cc3: campusAdminInfoResponse.cc3,
    sqd0: campusAdminInfoResponse.sqd0,
    sqd1: campusAdminInfoResponse.sqd1,
    sqd2: campusAdminInfoResponse.sqd2,
    sqd3: campusAdminInfoResponse.sqd3,
    sqd4: campusAdminInfoResponse.sqd4,
    sqd5: campusAdminInfoResponse.sqd5,
    sqd6: campusAdminInfoResponse.sqd6,
    sqd7: campusAdminInfoResponse.sqd7,
    sqd8: campusAdminInfoResponse.sqd8,
    mean: campusAdminInfoResponse.mean
  };
  return NextResponse.json({ campusAdminInfo }, { status: 200 });
}
