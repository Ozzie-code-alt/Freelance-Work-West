import { connectMongo } from '@/lib/connection';
import SBM from '@/models/sbm';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
  try {
    const {
      date,
      userName,
      servicesReceived,
      clientType,
      pointOfOrigin,
      officeVisited,
      age,
      cc1,
      cc2,
      cc3,
      sex,
      sqd0,
      sqd1,
      sqd2,
      sqd3,
      sqd4,
      sqd5,
      sqd6,
      sqd7,
      sqd8,
      mean
      //@ts-ignore
    } = await req.json();
    await connectMongo();
    await SBM.create({
      date,
      userName,
      servicesReceived,
      clientType,
      pointOfOrigin,
      officeVisited,
      age,
      sex,
      cc1,
      cc2,
      cc3,
      sqd0,
      sqd1,
      sqd2,
      sqd3,
      sqd4,
      sqd5,
      sqd6,
      sqd7,
      sqd8,
      mean
    });
    console.log('SBM Information Sent');
    return NextResponse.json({ message: 'SBM Information Sent it work now' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending Personal Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const sbms = await SBM.find();
  console.log('Logg SBM Information', sbms);
  const dateConverted = sbms.map((sbm) => ({
    ...sbm._doc,
    date: sbm.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ sbms: dateConverted }, { status: 200 });
}
