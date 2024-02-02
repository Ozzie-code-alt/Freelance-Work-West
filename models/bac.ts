import mongoose, { Schema, models } from "mongoose";
// Everything From Personal To 
const BACSchema = new Schema(
    {
      date: {
        type: Date,
        required: true,
      },
      servicesReceived: {
        type: String,
        required: true,
      },
      externalClient: {
        type: String,
        required: true,
      },
      pointOfOrigin: {
        type: String,
        required: true,
      },
      officeVisited: {
        type: String,
        required: true,
      },
      internalClient: {
        type: String,
        required: true,
      },
      sex: {
        type: String, 
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const BAC = models.BAC || mongoose.model("BAC", BACSchema);
  export default BAC;