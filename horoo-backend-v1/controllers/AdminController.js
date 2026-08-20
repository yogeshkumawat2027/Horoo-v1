const Listing = require("../models/Listing");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


exports.registerAdmin = async (req, res) =>{
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const existingAdmin = await Admin.findOne({ email });

    if(existingAdmin)   return res.status(409).json({ success: false,message: "Admin already exists with this email"});
      

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });

  }catch(error){
    console.error("Admin register error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if(!admin)  return res.status(401).json({success: false , message: "Invalid email or password" });
      
    const isPasswordCorrect = await bcrypt.compare( password, admin.password );
      

    if(!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        lastLogin: admin.lastLogin,
      },
    });

  }catch(error) {
    console.error("Admin login error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("owner", "name email mobile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch(error) {

    console.error("Get all listings error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};