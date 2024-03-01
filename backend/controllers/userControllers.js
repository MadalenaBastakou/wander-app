import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import cloudinary from "cloudinary";

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    let user = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    const hashedPassword = bcryptjs.hashSync(req.body.password, 10);
    user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = user._doc;
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res
      .status(200)
      .json({ message: "User registered successfully", user: rest });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: errors.array() });
  }
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    const { password: pass, ...rest } = user._doc;
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res
      .status(200)
      .json({ message: "User logged in successfully", user: rest });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      const { password: pass, ...rest } = user._doc;
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({
        message: "User logged in successfully with Google",
        user: rest,
      });
    } else {
      const generatedNumber =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedNumber, 10);
      const newUser = new User({
        firstName: req.body.name.split(" ")[0],
        lastName: req.body.name.split(" ")[1],
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        profileImagePath: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      const { password: pass, ...rest } = newUser._doc;
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res.status(200).json({
        message: "User logged in successfully with Google",
        user: rest,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
    next(err);
  }
};

const validateToken = (req, res) => {
  res.status(200).json({ userId: req.userId });
};

const logout = (req, res) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.cookie("user", "", {
    expires: new Date(0),
  });
  res.send();
};

const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.find({ _id: userId });
    const { password: pass, ...rest } = user._doc;
    console.log(rest);
    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot find trips" });
  }
};

const getUserDetails = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getTripList = async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(200).json(trips);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Cannot find trips" });
  }
};

const handleFavorite = async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId);

    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      const { password: pass, ...rest } = user._doc;
      res.status(200).json({
        message: "Listing is removed from wish list",
        rest,
        liked: false,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      const { password: pass, ...rest } = user._doc;
      res.status(200).json({
        message: "Listing is added from wish list",
        rest,
        liked: true,
      });
    }
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id, ...updatedUser } = req.body;

    updatedUser.updatedAt = new Date();

    if (
      updatedUser.password &&
      updatedUser.password !== "" &&
      updatedUser.password !== "undefined"
    ) {
      updatedUser.password = bcryptjs.hashSync(req.body.password, 10);
    } else {
      delete updatedUser.password;
    }

    if (req.files.length !== 0) {
      const files = req.files;
      const updatedPhotos = await uploadImages(files);
      updatedUser.profileImagePath = updatedPhotos;
    }

    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      updatedUser,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.save();
    const { password: pass, ...rest } = user._doc;
    res.status(201).json({ message: "User updated successfully", user: rest });
  } catch (error) {
    console.log("Error updating user:" + error);
    res.status(500).json("Something went wrong");
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const listings = await Listing.find({ creator: userId });

    for (const listing of listings) {
      await Listing.findByIdAndDelete(listing._id);
    }

    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: "User and user listings deleted successfully" });
  } catch (error) {
    console.log("Error deleting user:" + error);
    res.status(500).json("Something went wrong");
  }
};

async function uploadImages(imageFiles) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default {
  signup,
  login,
  validateToken,
  google,
  logout,
  getUser,
  getTripList,
  handleFavorite,
  updateUser,
  deleteUser,
  getUserDetails,
};
