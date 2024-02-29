import { parse } from "dotenv";
import Listing from "../models/Listing.js";
import User from "../models/User.js"
import { query } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY);

const searchListings = async (req, res) => {
  try {
    const query = constructedSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOption) {
      case "pricePerNightAsc":
        sortOptions = { price: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { price: -1 };
        break;
    }

    const pageSize = 6;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * pageSize;

    const listings = await Listing.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Listing.countDocuments(query);

    const response = {
      data: listings,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const createPayment = async (req, res) => {
  const { numberOfNights } = req.body;
  const listingId = req.params.listingId;

  const listing = await Listing.findById(listingId);
  if (!listing) {
    return res.status(400).json({ message: "Listing not found" });
  }
  const totalCost = listing.price * numberOfNights;
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost * 100,
    currency: "eur",
    metadata: {
      listingId,
      userId: req.userId,
    },
  });

  if (!paymentIntent.client_secret) {
    return res.status(500).json({ message: "Error creating payment intent" });
  }

  const response = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost,
  };

  res.send(response);
};

const createBooking = async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log(paymentIntentId);

    if (!paymentIntent) {
      return res.status(500).json({ message: "payment intent not found" });
    }

    if (
      paymentIntent.metadata.listingId !== req.params.listingId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      return res.status(500).json({ message: "payment intent mismatch" });
    }

    if(paymentIntent.status !== "succeeded") {
      return res.status(400).json({ message: `payment intent not succeeded. Status: ${paymentIntent.status}` });
    }

    const newBooking = {
      ...req.body, userId: req.userId
    }

    const listing = await Listing.findOneAndUpdate({_id: req.params.listingId}, {$push: {bookings: newBooking}})
    if(!listing) {
      return res.status(400).json({ message: "listing not found" });
    }
    await listing.save()
    res.status(200).send()
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}

const constructedSearchQuery = (queryParams) => {
  let constructedQuery = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
      { title: new RegExp(queryParams.destination, "i") },
      { province: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.guests) {
    constructedQuery.guestCount = {
      $gte: parseInt(queryParams.guests),
    };
  }

  if (queryParams.facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(queryParams.facilities)
        ? queryParams.facilities
        : [queryParams.facilities],
    };
  }

  if (queryParams.category && queryParams.category !== "All") {
    constructedQuery.category = new RegExp(queryParams.category, "i");
  }

  if (queryParams.type) {
    constructedQuery.type = new RegExp(queryParams.type, "i");
  }

  if (queryParams.maxPrice && parseInt(queryParams.maxPrice) !== 0) {
    constructedQuery.price = {
      $lte: parseInt(queryParams.maxPrice).toString(),
    };
  }

  return constructedQuery;
};

// /*LISTING DETAILS*/
// const getListing = async (req, res) => {
//   try {
//     const { listingId } = req.params;
//     const listing = await Listing.findById({ _id: listingId }).populate(
//       "creator"
//     );
//     res.status(202).json(listing);
//   } catch (error) {
//     console.log("Error fetching listing:" + error);
//     res.status(500).json("Something went wrong");
//   }
// };

export default {
  searchListings,
  // getListing,
  createPayment,
  createBooking
};
