const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    discountPrice: Number,
    imagesArray: [String],
    desc: String,
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    brand: String,
  },

  { collection: "products" }
);
//   const ProductCategory = mongoose.model('ProductCategory', categorySchema);
// const productCategory = new ProductCategory({
//   name: "Salon",
//   desc:""
// })
// productCategory.save(function (err, doc) {
//   console.log(doc._id);
//   console.log(err);
// });
module.exports =
  mongoose.models?.Product || mongoose.model("Product", productSchema);
