const express = require("express");
const router = express.Router();

const {createListing , editListing , deleteListing, updateAvailability} = require("../controllers/listingController");

const { auth } = require("../middlewares/auth");

const { isOwner} = require("../middlewares/isOwner")

router.post("/create", auth , isOwner , createListing);
router.put("/edit/:id" , auth , isOwner , editListing);
router.delete("/delete/:id" , auth , isOwner , deleteListing);
router.patch("/:id/availability",auth,isOwner,updateAvailability);
  
module.exports = router;