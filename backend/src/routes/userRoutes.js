import express from "express";
import userControllers from "../controllers/userControllers.js";
import { check } from "express-validator";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

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

router.post("/google", userControllers.google);

export default router;
