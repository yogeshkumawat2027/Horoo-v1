const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    name: { 
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ["flat", "room", "hostel", "house", "commercial"],
      required: true,
    },

    flatType: {
      type: String,
      enum: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"],
      default: null,
    },

    roomType: {
      type: String,
      enum: ["single", "double-sharing", "triple-sharing", "dormitory"],
      default: null,
    },

    availableFor: [{
      type: String,
      enum: ["boys", "girls", "family", "anyone"],
    }],

    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },

    size: { type: String, default: "" },

    description: { type: String, default: "",},

    address: { type: String, required: true},

    state: { 
      type: String, 
      required: true, 
      index: true
     },

    city: { 
      type: String, 
      required: true, 
       index: true 
      },

    area: { 
      type: String, 
      required: true,  
      index: true 
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },

    image: { type: String, default: null },

    facilities: [String],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },

    isShow: { type: Boolean, default: true },

    isAvailable: { type: Boolean, default: true },

    isVerified: { type: Boolean, default: false },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

listingSchema.index({ type: 1, status: 1 });
listingSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Listing", listingSchema);