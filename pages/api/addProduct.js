import dbConnect from "../../backLib/dbConnect";
import Corshandler from "../../backLib/cors";
import multer from "multer";
const path = require("path");
// import cloudinary from'cloudinary'
const DatauriParser = require('datauri/parser');

// import cloudinary from "../../backLib/cloudinary"
const cloudinary = require("../../backLib/cloudinary.js");
export const config = {
  api: { bodyParser: false },
};
// Multer config
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `uploads/`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
// var upload = multer({storage: storage,});
async function handler(req, res) {
  //   await dbConnect();
  await new Promise((resolve) => {
    // you may use any other multer function
    const mw = multer().array("images");
    //use resolve() instead of next()
    mw(req, res, resolve);
  });
  const uploader = async (path) => await cloudinary.uploads(path, `e-shop`);

// cloudinary.config({ 
//     cloud_name: 'dwxiuhqh4', 
//     api_key: '934751755851399', 
//     api_secret: 'aOJRLhYwYdEIdouJTP59SqlaSTU' 
//   });
  
// const uploader = async (file,folder) => await cloudinary.uploader.upload(file, (result) => {
//     return({
//      url: result.url,
//      id: result.public_id
//    })
//  }, {
//    resource_type: "auto",
//    folder: folder,
//    allowed_formats:['jpg','jpeg', 'png','webp']
//  })
 //https://medium.com/@joeokpus/uploading-images-to-cloudinary-using-multer-and-expressjs-f0b9a4e14c54
 //on the guide he imported datauti, he should have imported datauriParser, read the doc
 const dUri = new DatauriParser();
/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
//   console.log(req.files[0]);

const dataUri = req => dUri.format(path.extname(req.files[0].originalname).toString(),req.files[0].buffer);
const file = dataUri(req).content;

  const newPath = await uploader(file,  `e-shop`);
  console.log(newPath.url);
}
export default Corshandler(handler);
