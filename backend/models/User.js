import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profileImagePath: { type: Array, default: [] },
    tripList: { type: Array, default: [] },
    wishList: { type: Array, default: [] },
    propertyList: { type: Array, default: [] },
    reservationList: { type: Array, default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
