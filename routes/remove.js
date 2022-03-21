const express = require("express");
const User = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const multer = require("multer");
const cloudinary = require("cloudinary");



let upload = multer();

async function  verifyRole(req, res, next) {
   const {role}= await User.findOne({ email: req.user.username },{role:1,_id:0}).lean().exec()
   const isAdmin= role[0]==='admin'?true:false
   isAdmin ? next():res.json('You are not an Admin!')
}

router.post(
  "/",
  verifyJWT,
  upload.fields([]),
  verifyRole,
  async (req, res) => {
   console.log('isAdmin')

   const { imagesArray } = await Product.findOne({ _id: req.body.id }).lean().exec();
   console.log(imagesArray)

    // Product.deleteOne({_id:req.body.product_id}).then(async (removed)=>
    //   {
    //     console.log(removed)
    //     // await cloudinary.api.delete_resources_by_prefix(`e-shop`);

    //     res.json("Product deleted")
    //     //delete files in folder

    // }
    // ).catch(err=>console.log(err))
    // Product.findOne({_id:req.my_id})
    // console.log(req.my_id)
  }
);
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  
  if (token) {

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      else {
        req.user = {};
        // console.log(req.body.product_id)
        // req.user.id = req.body.product_id;
        req.user.username = decoded.username;
        req.user.role = decoded.role[0];
        next();
      }
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}
module.exports = router;
