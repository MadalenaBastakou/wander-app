import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js";


const getBookings = async (req, res) => {
  try {
    const listings = await Listing.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });
    const results = listings.map((listing) => {
      const userBookings = listing.bookings.filter(
        (booking) => booking.userId === req.userId
      );
      const listingWithUserBookings = {
        ...listing.toObject(),
        bookings: userBookings,
      };
      return listingWithUserBookings
    });
    res.status(200).send(results)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
};

export default { getBookings };
