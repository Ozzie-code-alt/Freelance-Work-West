import mongoose, { Schema, models } from 'mongoose';
const supplyBuildingSchema = new Schema(
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
    cc1: {
      type: String
    },
    cc2: {
      type: String
    },
    cc3: {
      type: String
    },
    sqd0: {
      type: String
    },
    sqd1: {
      type: String
    },
    sqd2: {
      type: String
    },
    sqd3: {
      type: String
    },
    sqd4: {
      type: String
    },
    sqd5: {
      type: String
    },
    sqd6: {
      type: String
    },
    sqd7: {
      type: String
    },
    sqd8: {
      type: String
    },
    mean: {
      type: String
    },
    comments: {
      type: String
    }
  },
  { timestamps: true }
);

const SupplyBuilding = models.SupplyBuilding || mongoose.model('SupplyBuilding', supplyBuildingSchema);
export default SupplyBuilding;
