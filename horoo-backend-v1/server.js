const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectRedis } = require("./config/redis");

const User = require("./models/User.js");

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes");
const ownerListingRoutes = require("./routes/owner.listingRoutes.js");
const userListingRoutes = require("./routes/user.listingRoutes.js");
const uploadRoutes = require("./routes/uploadRoutes");

const PORT = process.env.PORT || 5000 ;

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth" , authRoutes);
app.use("/api/listing/owner" , ownerListingRoutes);
app.use("/api/listing/user" , userListingRoutes);
app.use("/api/upload", uploadRoutes);


app.get("/", (req, res) => {
  res.send("API is Running...");
});

const startServer = async () => {
  try {
    connectDB();
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
