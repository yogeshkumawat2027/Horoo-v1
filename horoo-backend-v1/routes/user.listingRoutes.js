const express = require("express");
const router = express.Router();

const { getListings, getListingById } = require("../controllers/user.listingController");

const { auth } = require("../middlewares/auth");

router.get("/", getListings);
router.get("/:id", getListingById); 

module.exports = router;