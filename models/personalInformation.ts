import mongoose, { Schema, models } from "mongoose";
import { string } from "zod";

const PersonalInformationSchema = new Schema(
    {
      date: {
        type: Date,
        required: true,
      },
      userName:{
        type:String,
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