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

        const collectionSummary = await DynamicModel.aggregate([
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
