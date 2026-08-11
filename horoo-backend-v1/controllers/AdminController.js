const Listing = require("../models/Listing");

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .populate("owner", "name email mobile")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch(error) {

    console.error("Get all listings error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};