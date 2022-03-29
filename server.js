const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const addProductRouter = require("./routes/addProduct.js");
const corsRouter = require("./routes/cors.js");
const updateRouter = require("./routes/update.js");
const removeRouter = require("./routes/remove.js");
const searchRouter = require("./routes/search.js");
const passwordReset = require("./routes/passwordReset.js");

var cors = require('cors')



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
    server.use(cors())

    server.use("/api/password-reset", passwordReset);
    server.use("/api/addProduct", addProductRouter);
    server.use("/api/cors", corsRouter);
    server.use("/api/update", updateRouter);
    server.use("/api/remove", removeRouter);
    server.use("/api/search", searchRouter);
    
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
