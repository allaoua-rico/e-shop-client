const express = require("express");
const { search, verifyJWT, verifyRole, upload } = require("../backLib/middlewares");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  removeProduct,
} = require("../controllers/products");
const router = express.Router();

router
  .get("/", search, getAllProducts)
  .post("/", verifyJWT, verifyRole, upload.array("images"), addProduct)
  .put("/", verifyJWT, verifyRole, upload.array("images"), updateProduct)
  .delete("/", verifyJWT, verifyRole, upload.fields([]), removeProduct);

module.exports = router;
