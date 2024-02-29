import express from "express"
import bookingControllers from "../controllers/bookingControllers.js"
import verifyToken from "../middleware/verifyToken.js"
import Stripe from "stripe"




const router = express.Router()


// router.post("/create", bookingControllers.createBooking)
// router.post("/:listingId/bookings", verifyToken, bookingControllers.createBooking)
router.get("/", verifyToken, bookingControllers.getBookings)


export default router