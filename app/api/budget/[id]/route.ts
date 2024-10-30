import { connectMongo } from '@/lib/connection';
import Budget from '@/models/budget';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: any) {
  const { id } = params; //we grab id from link - desctructure
  await connectMongo();
  const budgetInfoResponse = await Budget.findById({ _id: id });

  const budgetInfo = {
    userName: budgetInfoResponse.userName,
    sex: budgetInfoResponse.sex,
    cc1: budgetInfoResponse.cc1,
    cc2: budgetInfoResponse.cc2,
    cc3: budgetInfoResponse.cc3,
    sqd0: budgetInfoResponse.sqd0,
    sqd1: budgetInfoResponse.sqd1,
    sqd2: budgetInfoResponse.sqd2,
    sqd3: budgetInfoResponse.sqd3,
    sqd4: budgetInfoResponse.sqd4,
    sqd5: budgetInfoResponse.sqd5,
    sqd6: budgetInfoResponse.sqd6,
    sqd7: budgetInfoResponse.sqd7,
    sqd8: budgetInfoResponse.sqd8,
    mean: budgetInfoResponse.mean
  };
  return NextResponse.json({ budgetInfo }, { status: 200 });
}
