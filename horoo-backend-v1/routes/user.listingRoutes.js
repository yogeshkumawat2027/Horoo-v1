const express = require("express");
const router = express.Router();

const { getListings, getListingById } = require("../controllers/user.listingController");

const { auth } = require("../middlewares/auth");

router.get("/:id", getListingById); 
router.get("/", getListings);


module.exports = router;