import { connectMongo } from '@/lib/connection';
import mongoose from 'mongoose';

export async function GET(req) {
  await connectMongo(); // Ensure MongoDB connection using your custom library

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

    // Use Promise.all to handle multiple asynchronous calls concurrently
    const commentsData = await Promise.all(
      collections.map(async (collectionName) => {
        try {
          // Define or reuse the dynamic model for the collection
          const DynamicModel =
            mongoose.models[collectionName] ||
            mongoose.model(
              collectionName,
              new mongoose.Schema({}, { collection: collectionName, strict: false })
            );

          // Fetch comments for the collection
          const comments = await DynamicModel.find({}, { comments: 1, _id: 0 }).lean();

          return {
            collection: collectionName,
            comments: comments.map((doc) => doc.comments || 'N/A Comments'),
          };
        } catch (error) {
          // Log any specific collection errors and continue processing other collections
          console.error(`Error fetching data for collection: ${collectionName}`, error);
          return {
            collection: collectionName,
            comments: ['Error fetching comments'],
          };
        }
      })
    );

    return new Response(JSON.stringify({ success: true, data: commentsData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data:', error); // Log the overall error for debugging
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
