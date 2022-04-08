const Product = require("../models/product");
const ProductCategory = require("../models/category");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const page = req.query.page;
  const viewLimit = req.query.viewLimit;
  let catId;

  if (req.query.cat) {
    catId = await ProductCategory.findOne({ name: req.query.cat }, { _id: 1 })
      .lean()
      .catch((err) => console.log(err));
  }
  const query = catId ? { category_id: catId } : {};
  let sort;
  if (req.query.sort === "recent") {
    sort = { _id: -1 };
  }
  if (req.query.sort === "price") {
    sort = { price: -1 };
  }
  if (req.query.sort === "alphabetical") {
    sort = { title: 1 };
  }

  const results = await Product.find(query)
    .lean()
    .sort(sort)
    .skip(page * 12 - 12)
    .limit(viewLimit)
    .catch((err) => console.log(err));

  res.json(results);
});
module.exports = router;
