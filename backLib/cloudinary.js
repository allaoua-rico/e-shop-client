const cloudinary =require( "cloudinary");
const dotenv=require('dotenv');
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    // console.log(file)
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      }
    );
  });
};