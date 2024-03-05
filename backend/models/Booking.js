import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
 { firstName: {type:String, required: true},
 lastName: {type:String, required: true},
 email: {type:String, required: true},
 checkIn: {type:Date, required: true},
 checkOut: {type:Date, required: true},
 userId: {type:String, required: true},
 totalCost: {type:Number, required: true},
},
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema)

export default Booking
