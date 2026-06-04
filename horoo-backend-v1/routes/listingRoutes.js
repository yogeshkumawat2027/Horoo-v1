const express = require("express");
const router = express.Router();

const {createListing,} = require("../controllers/listingController");

const { auth } = require("../middlewares/auth");

const { isOwner} = require("../middlewares/isOwner")

router.post("/create", auth , isOwner , createListing);
  
module.exports = router;