const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectRedis } = require("./config/redis");

const User = require("./models/User.js");

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const PORT = process.env.PORT || 5000 ;

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth" , authRoutes);
app.use("/api/listing" , listingRoutes);
app.use("/api/upload", uploadRoutes);


app.get("/", (req, res) => {
  res.send("API is Running...");
});

app.post("/register",async(req,res)=>{
  
})

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