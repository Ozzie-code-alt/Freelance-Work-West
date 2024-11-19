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
      'supplybuildings'
    ];

    const commentsData = [];

    for (const collectionName of collections) {
      // Define or reuse the dynamic model for the collection
      const DynamicModel =
        mongoose.models[collectionName] ||
        mongoose.model(
          collectionName,
          new mongoose.Schema({}, { collection: collectionName, strict: false })
        );

      // Fetch comments for the collection
      const comments = await DynamicModel.find({}, { comments: 1, date: 1, _id: 0 }); // Fetch comments and date

      commentsData.push({
        collection: collectionName,
        comments: comments.map((doc) => ({
          comment: doc.comments || 'N/A Comments',
          date: doc.date || 'Unknown Date'
        }))
      });
    }

    return new Response(JSON.stringify({ success: true, data: commentsData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
