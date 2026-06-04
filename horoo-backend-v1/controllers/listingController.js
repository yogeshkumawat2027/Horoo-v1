const Listing = require("../models/Listing");

exports.createListing = async (req, res) => {
  try {
    const {
      name,
      type,
      price,
      description,
      image
    } = req.body;

    if (!name || !type || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, type and price are required",
      });
    }

    const listing = await Listing.create({
      name,
      type,
      price,
      description,
      image,
      owner: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      listing,
    });

  }catch(error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};