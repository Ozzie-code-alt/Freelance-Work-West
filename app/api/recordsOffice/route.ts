import { connectMongo } from '@/lib/connection';

import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import RecordsOffice from '@/models/recordsOffice';

export async function POST(req: NextApiRequest) {
  try {
    //@ts-ignore
    const {
      date,
      userName,
      servicesReceived,
      externalClient,
      pointOfOrigin,
      officeVisited,
      internalClient,
      sex,
      reliability,
      responsiveness,
      access,
      communication,
      costs,
      integrity,
      assurance,
      outcome,
      message,
      mean,
      comments
      //@ts-ignore
    } = await req.json();
    await connectMongo();
    await RecordsOffice.create({
      date,
      userName,
      servicesReceived,
      externalClient,
      pointOfOrigin,
      officeVisited,
      internalClient,
      sex,
      reliability,
      responsiveness,
      access,
      communication,
      costs,
      integrity,
      assurance,
      outcome,
      message,
      mean,
      comments
    });
    console.log('Records Info  Sent');
    return NextResponse.json({ message: 'Records Info Sent' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending Records Info' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const recordsOfficeInfo = await RecordsOffice.find();
  console.log('Logg Records Info', recordsOfficeInfo);
  const recordsDateConverted = recordsOfficeInfo.map((recordsData) => ({
    ...recordsData._doc,
    date: recordsData.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ recordsOfficeInfo: recordsDateConverted }, { status: 200 });
}
