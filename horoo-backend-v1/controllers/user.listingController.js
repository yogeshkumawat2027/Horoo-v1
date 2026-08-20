const Listing = require("../models/Listing");

exports.getListings = async (req, res) =>{
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = 12;
    const skip = (page - 1) * limit;
    const {
      type,
      state,
      city,
      area,
      availableFor,
      roomType,
      flatType,
      minPrice,
      maxPrice,
      q,
    } = req.query;

    const filter = {
      isShow: true,
      status: "active",
    };

    if (type) filter.type = type;
    if (state) filter.state = new RegExp(String(state), "i");
    if (city) filter.city = new RegExp(String(city), "i");
    if (area) filter.area = new RegExp(String(area), "i");
    if (availableFor) filter.availableFor = String(availableFor).toLowerCase();
    if (roomType) filter.roomType = String(roomType);
    if (flatType) filter.flatType = String(flatType).toUpperCase();

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (q) {
      const search = new RegExp(String(q), "i");
      filter.$or = [
        { name: search },
        { city: search },
        { area: search },
        { address: search },
      ];
    }

    const [listings, totalListings] = await Promise.all([
      Listing.find(filter)
        .select("name type price flatType roomType availableFor images state city area isAvailable isVerified createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Listing.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      listings,
      pagination: {
        currentPage: page,
        totalListings,
        totalPages: Math.ceil(totalListings / limit),
        hasNextPage: page * limit < totalListings,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      isShow: true,
    }).populate("owner", "name mobile")
      .lean();
      

    if(!listing)  return res.status(404).json({  success: false,message: "Listing not found"});
     

    return res.status(200).json({success: true, listing });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
