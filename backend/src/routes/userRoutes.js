import express from "express";
import userControllers from "../controllers/userControllers.js";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.get("/validate-token", verifyToken, userControllers.validateToken);

router.post(
  "/signup",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("username", "Username is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
    check("email", "Email is required").isEmail(),
  ],
  userControllers.signup
);

router.post(
  "/login",
  [
    check("username", "Username is required").isString(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  userControllers.login
);


router.patch("/:userId/:listingId", userControllers.handleFavorite)
router.put("/:userId/",verifyToken, upload.array("profileImagePath") , userControllers.updateUser)
router.get("/:userId", userControllers.getUser)
router.get("/:userId/trips", userControllers.getTripList)
router.delete("/:userId", userControllers.deleteUser)
router.post("/google", userControllers.google);

router.post("/logout", userControllers.logout);


export default router;
