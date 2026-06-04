const User = require("../models/User");
const jwt = require("jsonwebtoken");
const client = require("../config/twilio");
const redis = require("../config/redis");

exports.sendOtp = async (req, res) => {
  try {
    const mobile = String(req.body.mobile || "").trim();

    if (!mobile) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required",
      });
    }

    // Cooldown check (60 sec)
    const cooldown = await redis.get(`cooldown:${mobile}`);

    if (cooldown) {
      return res.status(429).json({
        success: false,
        message: "Please wait before requesting another OTP",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();


    await redis.set(
      `otp:${mobile}`,
      otp,
      { ex: 300 }  // 5 min
    );


    await redis.set(
      `cooldown:${mobile}`,
      "1",
      { ex: 60 }
    );

    await client.messages.create({
      body: `Your Horoo OTP is ${otp}. Valid for 5 minutes.`,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+91${mobile}`,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp, // remove in production
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

//verify otp and register

exports.verifyOtp = async (req, res) => {
  try {

    const {
      mobile,
      otp,
      name,
      role
    } = req.body;

    const normalizedMobile = String(mobile || "").trim();
    const normalizedOtp = String(otp || "").trim();

    if (!normalizedMobile || !normalizedOtp) {
      return res.status(400).json({ success: false, message: "Mobile and OTP are required", });
    }

    const storedOtp = await redis.get(  //getting otp from redis
      `otp:${normalizedMobile}`
    );

    if (!storedOtp) return res.status(400).json({ success: false, message: "OTP expired" });


    if (String(storedOtp).trim() !== normalizedOtp) {

      return res.status(400).json({ success: false, message: "Invalid OTP" });

    }

    await redis.del(`otp:${normalizedMobile}`);


    let user = await User.findOne({ mobile: normalizedMobile });

    if (user) {
      user.lastLogin = new Date();

      if(!user.role){
        user.role = role;
      }
      await user.save();
    } else {
      // New User ---> Register

      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Name is required for new users",
        });
      }

      user = await User.create({
        name,
        mobile: normalizedMobile,
        role: role || "user",
        lastLogin: new Date(),
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      }, process.env.JWT_SECRET, { expiresIn: "30d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge:
        30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login / Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        mobile: user.mobile,
        role: user.role,
      },
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false,message: "Server Error"}); 
  }
};