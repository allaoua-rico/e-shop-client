const multer = require("multer");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Product = require("../models/product");

const storage = multer.memoryStorage();
exports.upload=  multer({ storage: storage });

exports.search = (req, res, next) => {
  if (req.query.title) {
    try {
      const input = new RegExp(req.query.title, "i");
      Product.find({ title: input }, { title: 1 }, (err, docs) => {
        if (err) return res.json({ msg: "An Error Occured" });
        res.json(docs);
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    next();
  }
};
exports.verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
      return res.json({
          type: 'error',
          message: err.message,
        })
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    return res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};
exports.verifyRole= async (req, res, next)=> {
  const { role } = await User.findOne(
    { email: req.user.username },
    { role: 1, _id: 0 }
  )
    .lean()
    .exec();
  const isAdmin = role[0] === "admin" ? true : false;
  isAdmin ? next() : res.json("You are not an Admin!");
}