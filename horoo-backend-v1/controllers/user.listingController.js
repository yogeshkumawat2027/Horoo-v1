const Listing = require("../models/Listing");

exports.getListings = async (req, res) =>{
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = 12;
    const skip = (page - 1) * limit;

    const filter = {
      isShow: true,
    };

    console.log(Listing.find({}));

    // const { type } = req.query;

    //  if(type){
    //   filter.type = type;
    // }

    const [listings, totalListings] = await Promise.all([
      Listing.find(filter)
        .select( "title rent roomType availableFor images state city area")
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