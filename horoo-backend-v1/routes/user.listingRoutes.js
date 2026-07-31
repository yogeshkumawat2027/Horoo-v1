const express = require("express");
const router = express.Router();

const { getListing } = require("../controllers/user.listingController");

const { auth } = require("../middlewares/auth");

  
module.exports = router;