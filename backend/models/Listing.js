import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    street: { type: String, required: true },
    aptSuite: { type: String },
    city: { type: String, required: true },
    province: { type: String },
    country: { type: String, required: true },
    guestCount: { type: Number, required: true },
    bedroomCount: { type: Number, required: true },
    bedCount: { type: Number, required: true },
    bathroomCount: { type: Number, required: true },
    facilities: { type: Array, default: [{}] },
    photos: [{ type: String }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    lastUpdated: { type: Date, required: true },
    bookings: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
