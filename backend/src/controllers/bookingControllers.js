import Booking from "../models/Booking.js";

/**CREATE BOOKING */
const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const booking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.log("Error creating booking:" + error);
    res.status(500).json("Something went wrong");
  }
};


export default { createBooking };
