const express = require("express");
const router = express.Router();

const {createListing , editListing , deleteListing, updateAvailability, getListings , getListing} = require("../controllers/owner.listingController");

const { auth } = require("../middlewares/auth");
const { isOwner} = require("../middlewares/isOwner")

router.post("/create", auth , isOwner , createListing);
router.put("/edit/:id" , auth , isOwner , editListing);
router.delete("/delete/:id" , auth , isOwner , deleteListing);
router.patch("/:id/availability",auth,isOwner,updateAvailability);
router.get("/my-listings", auth, isOwner, getListings);
router.get("/my-listings/:id", auth, isOwner, getListings);
  
module.exports = router;