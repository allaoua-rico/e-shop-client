const User = require("../models/user");
const jwt = require("jsonwebtoken");
const AppError = require("../backLib/appError.Js");

module.exports.signup = async (req, res, next) => {
  try {
    const exist = await User.findOne({ email: req.body.email });
    if (exist)
      return next(new AppError("Email already assigned to an account.", 400));
    const { email, _id } = await User.create({
      email: req.body.email,
      password: req.body.password,
      // role: ["admin"],
    });
    return res.status(201).json({ message: "registed", email, _id });
  } catch (error) {
    return next(new AppError("Couldn't create the user", 400));
  }
};
module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ email }).select("+password");
  if (!exist || !(await exist.correctPassword(password, exist.password)))
    return next(new AppError("Invalid email or password", 401));

  const payload = {
    username: exist.email,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 7200, 
  });
  return res.json({
    message: "Successfully loggedIn",
    username: exist.email,
    role: exist.role,
    token: "Bearer " + token,
  });
};
