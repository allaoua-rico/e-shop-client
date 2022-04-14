const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const corsRouter = require("./routes/cors.js");
const passwordReset = require("./routes/passwordReset.js");
const productsRouter = require("./routes/products.js");
const globalErrorController = require("./controllers/errorController.js");

var cors = require("cors");

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

if (dev) {
  require("dotenv").config();
}

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(express.json());
    server.use(cors());

    server.use("/api/password-reset", passwordReset);
    server.use("/api/cors", corsRouter);
    server.use("/api/products", productsRouter);

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    //global error handling middleware
    server.use(globalErrorController);

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
