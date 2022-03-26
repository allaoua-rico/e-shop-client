import dbConnect from "../../backLib/dbConnect";
import Product from "../../models/product";
import Corshandler from "../../backLib/cors";
async function handler(req, res) {
  await dbConnect();
  // console.log(req.query);
  try {
    const docs = await Product.find({
      category_id: req.query.cat,
      _id: { $ne: req.query.exclude },
    })
      .limit(3)
      .lean();
    res.json(docs);
  } catch (error) {
    console.log(error);
  }
}
export default Corshandler(handler);
