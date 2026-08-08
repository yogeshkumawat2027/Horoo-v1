const express = require("express");
const router = express.Router();

// const { sendOtp, verifyOtp,getMe } = require("../controllers/authController");
const { auth } = require("../middlewares/auth");

const {  register } = require("../controllers/authController");
 

router.post("/register", register);
  
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.get("/me", auth, getMe);

module.exports = router;