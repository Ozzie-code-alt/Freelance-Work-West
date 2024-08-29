import { connectMongo } from '@/lib/connection';
import RIX from '@/models/rix';
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
    await RIX.create({
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
    console.log('RIX Information Sent');
    return NextResponse.json({ message: 'RIX Information Sent it work now' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending Personal Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const rixs = await RIX.find();
  console.log('Logg rix Information', rixs);
  const dateConverted = rixs.map((rix) => ({
    ...rix._doc,
    date: rix.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ rixs: dateConverted }, { status: 200 });
}
