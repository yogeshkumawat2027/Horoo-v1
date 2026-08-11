const express = require("express");

const router = express.Router();


const { isAdmin } = require("../middlewares/isAdmin");
const { getAllListings } = require("../controllers/AdminController");



router.get("/listings", isAdmin, getAllListings);

module.exports = router;