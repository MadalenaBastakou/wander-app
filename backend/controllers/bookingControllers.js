import Booking from "../models/Booking.js";
import User from "../models/User.js";

/**CREATE BOOKING */
const createBooking = async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;
    const user = await User.findById(customerId )
   
    const booking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });
    await booking.save();
    user.tripList.push(booking);
    
    await user.save();
    res.status(200).json({user, booking});
  } catch (error) {
    console.log("Error creating booking:" + error);
    res.status(500).json("Something went wrong");
  }
};

export default { createBooking };
