import { ListIndexesCursor } from "mongodb";
import Listing from "../models/Listing.js";

/*GET BOOKINGS*/
const getBookings = async (req, res) => {
  try {
    const listings = await Listing.find({
      bookings: { $elemMatch: { userId: req.userId } },
    }).populate("creator");
    const results = listings.map((listing) => {
      const userBookings = listing.bookings.filter(
        (booking) => booking.userId === req.userId
      );
      const listingWithUserBookings = {
        ...listing.toObject(),
        bookings: userBookings,
      };
      return listingWithUserBookings;
    });
    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
};

const deleteBooking = async(req, res) => {
  const {paymentIntentId} = req.params
  try {
    const result = await Listing.updateOne(
      {},
      { $pull: { bookings: { paymentIntentId } } }
    );
    if (result.nModified > 0) {
      res.status(200).send({ message: "success" });
    } else {
      res.status(404).send({ message: "Booking not found" });
    }
  }catch(error) {
    console.log(error);
    res.status(500).json({ message: "Unable to delete booking" });
  }
}

export default { getBookings, deleteBooking };
