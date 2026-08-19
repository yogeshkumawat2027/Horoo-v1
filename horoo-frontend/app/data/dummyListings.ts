import { Listing } from "@/components/ListingCard";

export const dummyListings: Listing[] = [
  {
    _id: "room-001",
    slug: "comfortable-single-room-kota",
    horooName: "Comfortable Single Room",

    type: "room",

    state: {
      name: "Rajasthan",
    },

    city: {
      name: "Kota",
    },

    area: {
      name: "Talwandi",
    },

    pincode: "324005",

    roomType: ["Single"],

    availableFor: ["Boys"],

    ownerPrice: 5500,

    horooPrice: 6000,

    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    ],

    averageRating: 4.2,

    totalRatings: 18,
  },

  {
    _id: "room-002",
    slug: "double-room-kota",
    horooName: "Premium Double Room",

    type: "room",

    state: {
      name: "Rajasthan",
    },

    city: {
      name: "Kota",
    },

    area: {
      name: "Vigyan Nagar",
    },

    pincode: "324005",

    roomType: ["Double"],

    availableFor: ["Girls"],

    ownerPrice: 7000,

    horooPrice: 7500,

    images: [
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc",
      "https://images.unsplash.com/photo-1560185008-b033106af5c3",
    ],

    averageRating: 4.5,

    totalRatings: 25,
  },

  {
    _id: "flat-001",
    slug: "2bhk-flat-kota",
    horooName: "Spacious 2 BHK Flat",

    type: "flat",

    state: {
      name: "Rajasthan",
    },

    city: {
      name: "Kota",
    },

    area: {
      name: "Mahaveer Nagar",
    },

    pincode: "324005",

    roomType: ["Double"],

    availableFor: ["Family"],

    ownerPrice: 12000,

    horooPrice: 14000,

    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",
    ],

    averageRating: 4.7,

    totalRatings: 32,
  },

  {
    _id: "hostel-001",
    slug: "student-hostel-kota",
    horooName: "Student Boys Hostel",

    type: "hostel",

    state: {
      name: "Rajasthan",
    },

    city: {
      name: "Kota",
    },

    area: {
      name: "Rajeev Gandhi Nagar",
    },

    pincode: "324005",

    roomType: ["Triple"],

    availableFor: ["Boys"],

    ownerPrice: 4500,

    horooPrice: 5000,

    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5",
    ],

    averageRating: 4.1,

    totalRatings: 12,
  },

  {
    _id: "house-001",
    slug: "family-house-kota",
    horooName: "Beautiful Family House",

    type: "house",

    state: {
      name: "Rajasthan",
    },

    city: {
      name: "Kota",
    },

    area: {
      name: "Borkheda",
    },

    pincode: "324001",

    availableFor: ["Family"],

    ownerPrice: 15000,

    horooPrice: 16000,

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ],

    averageRating: 4.6,

    totalRatings: 21,
  },

  {
    _id: "commercial-001",
    slug: "commercial-shop-kota",
    horooName: "Main Road Commercial Shop",

    type: "commercial",

    state: {
      name: "Rajasthan",
    },

    city: {
      name: "Kota",
    },

    area: {
      name: "Indra Vihar",
    },

    pincode: "324005",

    ownerPrice: 18000,

    horooPrice: 20000,

    images: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    ],

    averageRating: 4.3,

    totalRatings: 9,
  },
];