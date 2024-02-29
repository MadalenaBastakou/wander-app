import express from "express";
import listingControllers from "../controllers/listingControllers.js"

const router = express.Router()

router.get('/search',listingControllers.searchListings)

export default router