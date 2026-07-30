const Listing = require("../models/Listing");


exports.createListing = async (req, res) => {

  try {
    const { name, type, price, address, state, city } = req.body;

    if (!name || !price || !type || !address || !state || !city) {
      return res.status(400).json({ success: false, message: " required fileds are missing" });
    }

    const listing = await Listing.create({
      ...req.body,
      owner: req.user.id,
    });

    return res.json(201).json({ success: true, message: "listing created", listing })

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "server error" });
  }
}

exports.editListing = async (req, res) => {
  try {
    const { id } = req.params;

    delete req.body.isVerified;
    delete req.body.isShow;
    delete req.body.owner;

    const listing = await Listing.findOneAndUpdate(
      {
        _id: id,
        owner: req.user.id,   // owner can update only self listing
      },
      req.body,
      { new: true, runValidators: true }
    );

    if (!listing) {
      return res.status(404).json({ success: false, message: "listing not found to edit" });
    }

    return res.status(200).json({ success: true, message: "listing updated successfully", listing });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: true, message: "server error" });
  }
}

exports.deleteListing = async (req, res) => {

  try {
    const { id } = req.params;

     const listing = await Listing.findOneAndDelete({
      _id: id,
      owner: req.user.id,   //  ownership check
    });

    if (!listing){
      return res.status(404).json({ success: false, message: "listing not found or error to delete" });
    }

    return res.status(200).json({ success: true, message: "listing deleted successfully", listing });
  } catch (err){
    console.log(err);

    return res.status(500).json({ success: false, message: "server error" });
  }
}

exports.updateAvailability = async (req, res) => {
  try {

    const id = req.params.id;
    const availibility = req.body.isAvailable;
    const listing = await Listing.findOneAndUpdate(
      { _id: id , owner: req.user.id},
      { isAvailable: availibility },
      {new: true, } // returns updated new document
    );

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Availability updated",
      listing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};