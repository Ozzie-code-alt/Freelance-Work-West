import { connectMongo } from '@/lib/connection';
import OSA from '@/models/osa';
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
    await OSA.create({
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
    console.log('OSA Information Sent');
    return NextResponse.json({ message: 'OSA Information Sent' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending OSA Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const osas = await OSA.find();
  console.log('Logg OSA Information', osas);
  const osasdateConverted = osas.map((osasData) => ({
    ...osasData._doc,
    date: osasData.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ osas: osasdateConverted }, { status: 200 });
}
