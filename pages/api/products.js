import dbConnect from "../../lib/dbConnect";
import Product  from "../../models/product"
import ProductCategory from "../../models/category";
import Corshandler from '../../lib/cors'
 async function handler(req, res) {
  await dbConnect();
  const page = req.query.page;
  let catId;

  if (req.query.cat) {
    catId = await ProductCategory.findOne({ name: req.query.cat }, { _id: 1 })
      .lean()
      .catch((err) => console.log(err));
  }
  const query = catId ? { category_id: catId } : {};
  const results = await Product.find(query)
    .lean()
    .sort({ _id: -1 })
    .skip(page * 12 - 12)
    .limit(8)
    .catch((err) => console.log(err));

  res.json(results);
}
export default Corshandler(handler)