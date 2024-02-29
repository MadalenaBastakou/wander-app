import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Listing from "../models/Listing.js";

/**CREATE BOOKING */
// const createBooking = async (req, res) => {
//   try {
//     const paymentIntentId = req.body.paymentIntentId;
//     console.log(paymentIntentId);

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (!paymentIntent) {
//       return res.status(500).json({ message: "payment intent not found" });
//     }

//     if (
//       paymentIntent.metadata.listingId !== req.params.listingId ||
//       paymentIntent.metadata.userId !== req.userId
//     ) {
//       return res.status(500).json({ message: "payment intent mismatch" });
//     }

//     if(paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ message: `payment intent not succeeded. Status: ${paymentIntent.status}` });
//     }

//     const newBooking = {
//       ...req.body, userId: req.userId
//     }

//     const user = await User.findOneAndUpdate({_id: req.userId}, {$push: {bookings: newBooking}})
//     if(!user) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     await user.save()
//     res.status(200).send()
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// try {
//   const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
//     req.body;
//   const user = await User.findById(customerId )

//   const booking = new Booking({
//     customerId,
//     hostId,
//     listingId,
//     startDate,
//     endDate,
//     totalPrice,
//   });
//   await booking.save();
//   user.tripList.push(booking);

//   await user.save();
//   res.status(200).json({user, booking});
// } catch (error) {
//   console.log("Error creating booking:" + error);
//   res.status(500).json("Something went wrong");
// }
// };

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
