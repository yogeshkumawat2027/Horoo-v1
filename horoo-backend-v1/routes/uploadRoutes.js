const express = require('express');

const router = express.Router();

const { auth } = require("../middlewares/auth");

const { isOwner} = require("../middlewares/isOwner");

const { getUploadSignature } = require('../controllers/uploadController');

// console.log(auth);
// console.log(isOwner);
// console.log(getUploadSignature);

router.get("/signature" , auth ,isOwner , getUploadSignature);

module.exports = router;