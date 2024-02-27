import express from "express"
import bookingControllers from "../controllers/bookingControllers.js"

const router = express.Router()

router.post("/create", bookingControllers.createBooking)


export default router