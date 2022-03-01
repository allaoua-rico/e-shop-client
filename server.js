// const express = require('express')
// const next = require('next')
// const mongoose = require('mongoose');
// const ProductCategory = require('./models/category');
// const productsRouter = require("./routes/products");

// const port = parseInt(process.env.PORT, 10) || 4000
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// if (dev){ require('dotenv').config()}

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db= mongoose.connection;
// db.on('error', error=> console.error(error));
// db.once('open', ()=>console.log('connected to mongoose'));

// app.prepare().then(() => {
//   const server = express();
//   server.use('/api/products',productsRouter)
//   server.all('*', (req, res) => {
//     return handle(req, res)
//   })
//   server.listen(port, (err) => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)
//   })
// })