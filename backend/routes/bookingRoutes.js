import express from "express"
import bookingControllers from "../controllers/bookingControllers.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

// router.post("/create", bookingControllers.createBooking)
// router.post("/:listingId/bookings", verifyToken, bookingControllers.createBooking)
router.delete("/:paymentIntentId", verifyToken, bookingControllers.deleteBooking)
router.get("/", verifyToken, bookingControllers.getBookings)


export default router