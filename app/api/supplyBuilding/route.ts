import { connectMongo } from '@/lib/connection';
import SupplyBuilding from '@/models/supplyBuilding';
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
    await SupplyBuilding.create({
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
    console.log('SupplyBuilding Information Sent');
    return NextResponse.json({ message: 'SupplyBuilding Information Sent it work now' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending Personal Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const SupplyBuildings = await SupplyBuilding.find();
  console.log('Logg SupplyBuilding Information', SupplyBuildings);
  const dateConverted = SupplyBuildings.map((SupplyBuilding) => ({
    ...SupplyBuilding._doc,
    date: SupplyBuilding.date.toISOString().split('T')[0]
  }));
  return NextResponse.json({ SupplyBuildings: dateConverted }, { status: 200 });
}
