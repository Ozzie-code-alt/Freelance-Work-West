import { connectMongo } from '@/lib/connection';
import EDUC from '@/models/educ';
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
    await EDUC.create({
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
    console.log('Educ Information Sent');
    return NextResponse.json({ message: 'Educ Information Sent it work now' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending Educ Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const educs = await EDUC.find();
  console.log('Logg Educ Information', educs);
  const dateConverted = educs.map((educ) => ({
    ...educ._doc,
    date: educ.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ educs: dateConverted }, { status: 200 });
}
