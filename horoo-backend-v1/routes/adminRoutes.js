const express = require("express");

const router = express.Router();


const { isAdmin } = require("../middlewares/isAdmin");
const { getAllListings, registerAdmin, loginAdmin } = require("../controllers/AdminController");


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);


router.get("/listings", isAdmin, getAllListings);

module.exports = router;