import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const officeNames = [
      'Accounting',
      'AffairsOffice',
      'Alumni',
      'Awards',
      'Budget',
      'CampusAdmin',
      'Cashier',
      'Cultural',
      'Educ',
      'GenderDevelopment',
      'GeneralServices',
      'Guidance',
      'HRMO',
      'ICT',
      'IndustrialTech',
      'Library',
      'Medical',
      'MIS',
      'NSTP',
      'OSA',
      'PDU',
      'PersonalInformation',
      'PhysicalPlant',
      'PublicAffairs',
      'QualityAssurance',
      'RecordsOffice',
      'Registrar',
      'Research',
      'RMO',
      'RMU',
      'SMS',
      'Security',
      'SOBM',
      'SOICT',
      'SportsOffice',
    ];

    const summaryData = [];

    for (const office of officeNames) {
      const modelName = office;

      // Dynamically load the model
      const OfficeModel = mongoose.models[modelName] || mongoose.model(modelName, new mongoose.Schema({}, { strict: false }));

      const officeSummary = await OfficeModel.aggregate([
        {
          $group: {
            _id: '$officeVisited',
            totalResponses: { $sum: 1 },
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

      summaryData.push({ office, data: officeSummary });
    }

    res.status(200).json({ success: true, data: summaryData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
