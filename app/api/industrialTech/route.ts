import { connectMongo } from '@/lib/connection';
import industrialTech from '@/models/industrialTech';
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
      mean,
      comments
      //@ts-ignore
    } = await req.json();
    await connectMongo();
    await industrialTech.create({
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
      mean,
      comments
    });
    console.log('industrial tech Information Sent');
    return NextResponse.json(
      { message: 'industrial tech Information Sent it work now' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending Personal Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const industrialTechs = await industrialTech.find();
  console.log('Logg industrialTech Information', industrialTechs);
  const dateConverted = industrialTechs.map((industrialTech) => ({
    ...industrialTech._doc,
    date: industrialTech.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ industrialTechs: dateConverted }, { status: 200 });
}
