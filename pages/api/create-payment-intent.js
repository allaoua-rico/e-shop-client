import dbConnect from "../../backLib/dbConnect";
import Corshandler from "../../backLib/cors";
import { getBasketTotal } from "../../components/reducer";
const stripe = require("stripe")(
  "sk_test_51K5TBrIdfhW69TKtUdiszyUgjL3Nalwcwu3a7Ilf5mNAKbbFf3VUJ9U44YBuXe19bcaSPFrO8OuozWMeZAbnzlci00jjfz7u7V"
);

async function handler(req, res) {
  await dbConnect();
  // console.log(req.body.items);
  const calculateOrderAmount = (items) => {
    return getBasketTotal(items)*100
  };
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(req.body.items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
export default Corshandler(handler);
