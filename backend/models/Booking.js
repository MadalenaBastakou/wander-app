import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  // {
  //   customerId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  //   hostId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  //   listingId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Listing",
  //   },
  //   checkIn: {
  //     type: String,
  //     required: true,
  //   },
  //   checkOut: {
  //     type: String,
  //     required: true,
  //   },
  //   totalPrice: {
  //     type: Number,
  //     required: true,
  //   },
  // },
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
