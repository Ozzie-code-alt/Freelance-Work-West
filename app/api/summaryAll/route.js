import { connectMongo } from '@/lib/connection';
import mongoose from 'mongoose';

export async function GET(req) {
  await connectMongo();

  try {
    const collections = [
      'accountings',
      'affairsoffices',
      'alumnis',
      'awards',
      'bacs',
      'budgets',
      'campusadmins',
      'cashiers',
      'culturals',
      'educes',
      'genderdevelopments',
      'generalservices',
      'guidances',
      'hrmos',
      'icts',
      'industrialteches',
      'libraries',
      'medicals',
      'mis',
      'nstps',
      'osas',
      'pdus',
      'personalinformations',
      'physicalplants',
      'publicaffairs',
      'qualityassurances',
      'recordsoffices',
      'registrars',
      'researches',
      'rmos',
      'sbms',
      'securities',
      'sobms',
      'soicts',
      'sportsoffices',
      'studentaffairs',
      'supplybuildings',
    ];

    const summaryData = [];

    for (const collectionName of collections) {
      const DynamicModel =
        mongoose.models[collectionName] ||
        mongoose.model(
          collectionName,
          new mongoose.Schema({}, { collection: collectionName, strict: false })
        );

      const officeSummary = await DynamicModel.aggregate([
        {
          $group: {
            _id: '$officeVisited',
            totalResponses: { $sum: 1 },
            stronglyAgreeCount: {
              $sum: { $cond: [{ $eq: ['$sqd0', '5'] }, 1, 0] },
            },
            agreeCount: {
              $sum: { $cond: [{ $eq: ['$sqd0', '4'] }, 1, 0] },
            },
            naCount: {
              $sum: { $cond: [{ $eq: ['$sqd0', 'N/A'] }, 1, 0] },
            },
            avgSqd0: { $avg: { $toInt: '$sqd0' } },
            avgSqd1: { $avg: { $toInt: '$sqd1' } },
            avgSqd2: { $avg: { $toInt: '$sqd2' } },
            avgSqd3: { $avg: { $toInt: '$sqd3' } },
            avgSqd4: { $avg: { $toInt: '$sqd4' } },
            avgSqd5: { $avg: { $toInt: '$sqd5' } },
            avgSqd6: { $avg: { $toInt: '$sqd6' } },
            avgSqd7: { $avg: { $toInt: '$sqd7' } },
            avgSqd8: { $avg: { $toInt: '$sqd8' } },
          },
        },
        {
          $project: {
            office: '$_id',
            totalResponses: 1,
            stronglyAgreeCount: 1,
            agreeCount: 1,
            naCount: 1,
            overallScore: {
              $cond: [
                { $gt: [{ $subtract: ['$totalResponses', '$naCount'] }, 0] }, // Check denominator > 0
                {
                  $round: [
                    {
                      $divide: [
                        { $add: ['$stronglyAgreeCount', '$agreeCount'] },
                        { $subtract: ['$totalResponses', '$naCount'] },
                      ],
                    },
                    2,
                  ],
                },
                null, // If denominator is 0, return null
              ],
            },
            avgSqd0: { $round: ['$avgSqd0', 2] },
            avgSqd1: { $round: ['$avgSqd1', 2] },
            avgSqd2: { $round: ['$avgSqd2', 2] },
            avgSqd3: { $round: ['$avgSqd3', 2] },
            avgSqd4: { $round: ['$avgSqd4', 2] },
            avgSqd5: { $round: ['$avgSqd5', 2] },
            avgSqd6: { $round: ['$avgSqd6', 2] },
            avgSqd7: { $round: ['$avgSqd7', 2] },
            avgSqd8: { $round: ['$avgSqd8', 2] },
          },
        },
      ]);

      summaryData.push({ collection: collectionName, data: officeSummary });
    }

    return new Response(JSON.stringify({ success: true, data: summaryData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
