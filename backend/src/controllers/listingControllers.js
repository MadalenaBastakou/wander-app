import cloudinary from "cloudinary";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

const addListing = async (req, res) => {
  try {
    const imageFiles = req.files;
    const newListing = req.body;

    //upload the images to cloudinary
    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    //if upload was successful, add the URLs to the new listing
    newListing.photos = imageUrls;
    newListing.lastUpdated = new Date();
    const user = await User.findById({ _id: req.userId });
    const { password: pass, ...rest } = user._doc;
    newListing.creator = rest;

    //save the listing in the database
    const listing = new Listing(newListing);
    await listing.save();
    //return
    res.status(201).send(listing);
  } catch (error) {
    console.log("Error creating listing:" + error);
    res.status(500).json("Something went wrong");
  }
};

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find({ creator: { _id: req.userId } });
    res.json(listings);
  } catch (error) {
    console.log("Error fetching listings:" + error);
    res.status(500).json("Something went wrong");
  }
};

const getListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById({ _id: listingId });
    res.status(202).json(listing);
  } catch (error) {
    console.log("Error fetching listing:" + error);
    res.status(500).json("Something went wrong");
  }
};

export default { addListing, getListings, getListing };
