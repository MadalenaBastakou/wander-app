import express from "express";
import listingControllers from "../controllers/listingControllers.js"
import Stripe from "stripe"
import verifyToken from "../middleware/verifyToken.js"

const stripe = new Stripe(process.env.STRIPE_API_KEY)
const router = express.Router()

router.get('/search',listingControllers.searchListings)
router.post("/:listingId/bookings/payment-intent", verifyToken, listingControllers.createPayment)
router.post("/:listingId/bookings", verifyToken, listingControllers.createBooking)

export default router