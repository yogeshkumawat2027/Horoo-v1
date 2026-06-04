const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
      trim: true,
    },


    type: {
      type: String,
      enum: ["flat", "room", "hostel", "house"],
      required: true,
    },

    
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

   
    image: {
      type: String,
      default: null,
    },

    
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
     owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

                               // index for filtering
listingSchema.index({
  type: 1,
  status: 1,
});

module.exports = mongoose.model("Listing", listingSchema);