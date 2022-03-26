const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/", (req, res) => {
    try {
        const input = new RegExp(req.query.title,"i");
        Product.find(
            { title: input },
            { title: 1 },
            (err, docs) => {
              if(err) {
                console.log(err);
                res.json('An Error Occured')
              }
                res.json(docs)
            }
          );
    } catch (error) {
        
    }
//   console.log(req.query.title);


});

module.exports = router;
