import cloudinary from "cloudinary";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

/*CREATE LISTING*/
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
    const listing = new Listing(newListing)
    await listing.save();
    user.propertyList.push(listing)
    await user.save()
    //return
    res.status(201).json({listing, user});
  } catch (error) {
    console.log("Error creating listing:" + error);
    res.status(500).json("Something went wrong");
  }
};


/*USERS PERSONAL LISTINGS*/
const getUserListings = async (req, res) => {
  try {
    const listings = await Listing.find({ creator: { _id: req.userId } }).populate("creator")
    res.status(200).json(listings);
  } catch (error) {
    console.log("Error fetching listings:" + error);
    res.status(500).json("Something went wrong");
  }
};

/*LISTING DETAILS*/
const getListing = async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById({ _id: listingId }).populate("creator");
    res.status(202).json(listing);
  } catch (error) {
    console.log("Error fetching listing:" + error);
    res.status(500).json("Something went wrong");
  }
};

/*GET ALL LISTINGS*/
const getListings= async (req, res) => {
  const qCategory = req.query.category
  try {
    let listings
    if(qCategory) {
      listings = await Listing.find({category: qCategory}).populate("creator")
    }else {
      listings = await Listing.find().populate("creator")
    }
    res.status(200).json(listings)
  } catch (error) {
    console.log("Error fetching listings:" + error);
    res.status(500).json("Something went wrong");
  }
};

export default { addListing, getUserListings, getListing, getListings };
