import mongoose, { Schema, models } from "mongoose";

const PersonalInformationSchema = new Schema(
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
  
  const PersonalInformation = models.PersonalInformation || mongoose.model("PersonalInformation", PersonalInformationSchema);
  export default PersonalInformation;