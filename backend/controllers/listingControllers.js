import cloudinary from "cloudinary";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

/*CREATE LISTING*/
const addListing = async (req, res) => {
  try {
    const imageFiles = req.files;
    const newListing = req.body;

    //upload the images to cloudinary
    const imageUrls = await uploadImages(imageFiles);
    //if upload was successful, add the URLs to the new listing
    newListing.photos = imageUrls;
    newListing.lastUpdated = new Date();
    const user = await User.findById({ _id: req.userId });
    const { password: pass, ...rest } = user._doc;
    newListing.creator = rest;

    //save the listing in the database
    const listing = new Listing(newListing);
    await listing.save();
    user.propertyList.push(listing);
    await user.save();
    //return
    res.status(201).json({ listing, user });
  } catch (error) {
    console.log("Error creating listing:" + error);
    res.status(500).json("Something went wrong");
  }
};

/*DELETE LISTING */
const deleteListing = async (req, res) => {
  const { listingId } = req.params;
  try {
    const listing = await Listing.deleteOne({ _id: listingId });
    return res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.log("Error deleting listing:" + error);
    res.status(500).json("Something went wrong");
  }
};

/**UPDATE LISTING */
const updateListing = async (req, res) => {
  const {listingId} = req.params
  try {
    const updatedListing = req.body;

    updatedListing.lastUpdated = new Date();

    const listing = await Listing.findOneAndUpdate({_id: req.params.listingId}, updatedListing, {new:true})

    if(!listing) {
      return res.status(404).json({message: "Listing not found"})
    }

    const files = req.files
    const updatedPhotos = await uploadImages(files)

    listing.photos = [...listing.photos, ...updatedPhotos]
await listing.save()
res.status(201).json(listing)
  } catch (error) {
    console.log("Error updating listing:" + error);
    res.status(500).json("Something went wrong");
  }
};

/*USERS PERSONAL LISTINGS*/
const getUserListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      creator: { _id: req.userId },
    }).populate("creator");
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
    const listing = await Listing.findById({ _id: listingId }).populate(
      "creator"
    );
    res.status(202).json(listing);
  } catch (error) {
    console.log("Error fetching listing:" + error);
    res.status(500).json("Something went wrong");
  }
};

/*GET ALL LISTINGS*/
const getListings = async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }
    res.status(200).json(listings);
  } catch (error) {
    console.log("Error fetching listings:" + error);
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
  addListing,
  getUserListings,
  getListing,
  getListings,
  deleteListing,
  updateListing
};

