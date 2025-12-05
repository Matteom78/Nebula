const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUD_SECRET || process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports = cloudinary;