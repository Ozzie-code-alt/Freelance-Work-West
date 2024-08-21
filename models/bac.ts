import mongoose, { Schema, models } from 'mongoose';
const BACSchema = new Schema(
  {
    date: {
      type: Date
    },
    userName: {
      type: String
    },
    servicesReceived: {
      type: String
    },
    clientType: {
      type: String
    },
    pointOfOrigin: {
      type: String
    },
    officeVisited: {
      type: String
    },
    age: {
      type: String
    },
    sex: {
      type: String
    },
    responsiveness: {
      type: String
    },
    reliability: {
      type: String
    },
    access: {
      type: String
    },
    communication: {
      type: String
    },
    costs: {
      type: String
    },
    integrity: {
      type: String
    },
    assurance: {
      type: String
    },
    outcome: {
      type: String
    },
    message: {
      type: String
    },
    mean: {
      type: String
    }
  },
  { timestamps: true }
);

const BAC = models.BAC || mongoose.model('BAC', BACSchema);
export default BAC;
