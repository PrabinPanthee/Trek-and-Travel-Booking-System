import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required:true,
    },
    fullName: {
      type: String,
      required: true,
    },
    price:{
      type:Number,
      
    },
    payment_details:{
       paymentMethod:{
        type:String,
        default:'khalti'
       },
       status:{
        type:String,
        enum:['paid','failed'],
        default:'failed',
       },
       pidx:{
        type:String
       }
    },
    totalAmount:{
      type:Number,
    },
   guestSize:{
     type:Number,
     required:true,
   },
   phone:{
     type:Number,
     
   },
   bookAt:{
     type:Date,
     required:true,
   },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
