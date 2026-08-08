const express = require("express");
const router = express.Router();

// const { sendOtp, verifyOtp,getMe } = require("../controllers/authController");
const { auth } = require("../middlewares/auth");

const {  register, login , getMe, logout, forgotPassword, verifyResetOtp, resetPassword} = require("../controllers/authController");

 

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);
router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);
  
// router.post("/send-otp", sendOtp);
// router.post("/verify-otp", verifyOtp);
// router.get("/me", auth, getMe);

module.exports = router;