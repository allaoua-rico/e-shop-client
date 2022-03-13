// import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Corshandler from "../../backLib/cors";
import dbConnect from "../../backLib/dbConnect";
import User from "../../models/user";

async function handler(req, res) {
  await dbConnect();
  const userLoggingIn = req.body;
  if (req.body.op == "register") {
    User.findOne({ email: req.body.email })
      .then(async (dbUser) => {
        if(dbUser) {
          res.json({ message: "Email already assigned to an account." });
          return
        }
        // Create admin user doc with hashed password
        const saltRounds = 10;
        const hash = bcrypt.hashSync(req.body.password, saltRounds);
        const user = await new User({
          email: req.body.email,
          password: hash,
          // role: ["admin"],
        });
        console.log(user);
        user
          .save()
          .then((doc) => res.status(201).json(doc))
          .catch((err) => {
            res.status(500).json({ message: "Couldn't create the user" });
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  }
  if (req.body.op == "login") {
    User.findOne({ email: req.body.email }).then(async (dbUser) => {
      if (dbUser) {
        bcrypt.compare(req.body.password, dbUser.password).then((isCorrect) => {
          if (isCorrect) {
            // const isAdmin= dbUser.username=="test" ? true : false
            const payload = {
              id: dbUser.email,
              username: dbUser.username,
              role: dbUser.role,
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: 7200 },
              (err, token) => {
                err && res.json({ message: err });
                return res.json({
                  message: "Successfully logedIn",
                  username: dbUser.email,
                  role: dbUser.role,
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            res.json({ message: "Invalid password" });
          }
        });
      } else {
        res.json({ message: "Invalid Email" });
      }
    });

    // User.findOne({ email: req.body.email, password: req.body.password })
    //   .then(async (dbUser) => {
    //     console.log(dbUser);
    //   })
    //   .catch((err) => console.log(err));
  }
  // console.log(userLoggingIn);
  // if (!dbUser) {
  //   return res.json({ message: "Invalid Email or Password" });
  // }
  // bcrypt
  //   .compare(userLoggingIn.password, dbUser.password)
  //   .then((isCorrect) => {
  //     console.log(isCorrect);
  //     if (isCorrect) {
  //       // const isAdmin= dbUser.username=="test" ? true : false
  //       const payload = {
  //         id: dbUser._id,
  //         username: dbUser.username,
  //       };
  //       jwt.sign(
  //         payload,
  //         process.env.JWT_SECRET,
  //         { expiresIn: 86400 },
  //         (err, token) => {
  //           if (err) return res.json({ message: err });
  //           return res.json({
  //             message: "Success",
  //             username: dbUser.username,
  //             token: "Bearer " + token,
  //             // isAdmin: isAdmin ? true:false
  //           });
  //         }
  //       );
  //     }
  //   });
}
export default Corshandler(handler);
