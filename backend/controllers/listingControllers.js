import { parse } from "dotenv";
import Listing from "../models/Listing.js";

const searchListings = async (req, res) => {
  try {
    const query = constructedSearchQuery(req.query);
    console.log(query);
    let sortOptions = {};
    switch (req.query.sortOption) {
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
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

export default {
  searchListings,
};
