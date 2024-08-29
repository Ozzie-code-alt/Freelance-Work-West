import { connectMongo } from '@/lib/connection';
import ICT from '@/models/ict';
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
    await ICT.create({
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
    console.log('ICT Information Sent');
    return NextResponse.json({ message: 'ICT Information Sent it work now' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending ICT Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const icts = await ICT.find();
  console.log('Logg ICT Information', icts);
  const dateConverted = icts.map((ict) => ({
    ...ict._doc,
    date: ict.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ icts: dateConverted }, { status: 200 });
}
