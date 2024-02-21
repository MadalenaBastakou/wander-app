import express from "express";
import listingControllers from "../controllers/listingControllers.js";
import multer from "multer";
import verifyToken from "../middleware/verifyToken.js";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

//api/my-listing
router.post(
  "/",
  verifyToken,
  upload.array("photos", 6),
  [
    body("userId").notEmpty().withMessage("UserId is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("street").notEmpty().withMessage("Street address is required"),
    body("aptSuite").notEmpty().withMessage("AptSuite is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("province").notEmpty().withMessage("Province is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("guestCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Guest count is required and must be a number"),
    body("bedroomCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Bedroom count is required and must be a number"),
    body("bedCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Bed count is required and must be a number"),
    body("bathroomCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Bathroom count is required and must be a number"),
    body("amenities")
      .notEmpty()
      .isArray()
      .withMessage("amenities are required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price")
      .notEmpty()
      .isNumeric()
      .withMessage("Price is required and must be a number"),
    body("lastUpdated").notEmpty().withMessage("Last updated is required"),
  ],

  listingControllers.addListing
);

export default router;
