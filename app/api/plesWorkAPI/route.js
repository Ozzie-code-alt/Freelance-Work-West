import { connectMongo } from '@/lib/connection';
import mongoose from 'mongoose';

export async function GET(req) {
  await connectMongo();

  try {
    const { searchParams } = new URL(req.url);
    const year = parseInt(searchParams.get('year'));
    const month = parseInt(searchParams.get('month'));
    const week = parseInt(searchParams.get('week'));

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

    const questions = ['sqd0', 'sqd1', 'sqd2', 'sqd3', 'sqd4', 'sqd5', 'sqd6', 'sqd7', 'sqd8'];
    const summaryData = [];

    for (const question of questions) {
      const questionSummary = {
        name: question,
        StronglyAgree: 0,
        Agree: 0,
        NeitherAgreeNorDisagree: 0,
        Disagree: 0,
        StronglyDisagree: 0,
        NA: 0,
        totalResponses: 0,
        Overall: 0,
      };

      for (const collectionName of collections) {
        const DynamicModel =
          mongoose.models[collectionName] ||
          mongoose.model(
            collectionName,
            new mongoose.Schema({}, { collection: collectionName, strict: false })
          );

        // Build the match condition based on the provided year, month, week
        const matchCondition = {};
        if (year) {
          matchCondition.date = {
            ...matchCondition.date,
            $gte: new Date(year, 0, 1),
            $lt: new Date(year + 1, 0, 1),
          };
        }
        if (month) {
          matchCondition.date = {
            ...matchCondition.date,
            $gte: new Date(year, month - 1, 1),
            $lt: new Date(year, month, 1),
          };
        }
        if (week) {
          const startOfWeek = new Date(year, 0, 1 + (week - 1) * 7);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 7);

          matchCondition.date = {
            $gte: startOfWeek,
            $lt: endOfWeek,
          };
        }

        const collectionSummary = await DynamicModel.aggregate([
          { $match: matchCondition }, // Apply the time filter here
          {
            $group: {
              _id: null,
              StronglyAgree: { $sum: { $cond: [{ $eq: [`$${question}`, '5'] }, 1, 0] } },
              Agree: { $sum: { $cond: [{ $eq: [`$${question}`, '4'] }, 1, 0] } },
              NeitherAgreeNorDisagree: { $sum: { $cond: [{ $eq: [`$${question}`, '3'] }, 1, 0] } },
              Disagree: { $sum: { $cond: [{ $eq: [`$${question}`, '2'] }, 1, 0] } },
              StronglyDisagree: { $sum: { $cond: [{ $eq: [`$${question}`, '1'] }, 1, 0] } },
              NA: { $sum: { $cond: [{ $eq: [`$${question}`, 'N/A'] }, 1, 0] } },
              totalResponses: { $sum: 1 },
            },
          },
        ]);

        if (collectionSummary.length > 0) {
          const summary = collectionSummary[0];
          questionSummary.StronglyAgree += summary.StronglyAgree;
          questionSummary.Agree += summary.Agree;
          questionSummary.NeitherAgreeNorDisagree += summary.NeitherAgreeNorDisagree;
          questionSummary.Disagree += summary.Disagree;
          questionSummary.StronglyDisagree += summary.StronglyDisagree;
          questionSummary.NA += summary.NA;
          questionSummary.totalResponses += summary.totalResponses;
        }
      }

      // Calculate Overall Percentage
      const validResponses =
        questionSummary.totalResponses - questionSummary.NA;
      const positiveResponses =
        questionSummary.StronglyAgree + questionSummary.Agree;

      questionSummary.Overall =
        validResponses > 0
          ? ((positiveResponses / validResponses) * 100).toFixed(2)
          : 0;

      summaryData.push(questionSummary);
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
