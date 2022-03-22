import dbConnect from "../../backLib/dbConnect";
import Product from "../../models/product";
import Corshandler from "../../backLib/cors";
async function handler(req, res) {
  await dbConnect();
    // console.log(req.query);
  Product.find({ category_id: req.query.cat, _id: { $ne: req.query.exclude } })
    .limit(3)
    .lean()
    .then((docs) => res.json(docs));
}
export default Corshandler(handler);
