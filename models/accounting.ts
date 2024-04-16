import mongoose, { Schema, models } from "mongoose";
// Everything From Personal To 
const AccountingSchema = new Schema(
  {
    date: {
      type: Date,
   
    },
    userName:{
      type:String,
    },
    servicesReceived: {
      type: String,

    },
    externalClient: {
      type: String,

    },
    pointOfOrigin: {
      type: String,

    },
    officeVisited: {
      type: String,
 
    },
    internalClient: {
      type: String,
  
    },
    sex: {
      type: String,

    },
    responsiveness:{
      type: String,
     
    },
    reliability:{
      type: String,
 
    },
    access:{
      type: String,

    },
    communication:{
      type: String,
    
    },
    costs:{
      type: String,
    
    },
    integrity:{
      type: String,
 
    },
    assurance:{
      type: String,
 
    },    
    outcome:{
      type: String,
  
    },
    message:{
      type: String,
    },
    mean:{
      type: String,
    },

  },
  { timestamps: true }
  );
  
  const Accounting = models.Accounting || mongoose.model("Accounting", AccountingSchema);
  export default Accounting;