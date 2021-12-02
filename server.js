const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const productRoutes = require('./src/routes/Product.js');
const cartRoutes = require('./src/routes/Cart.js')

// const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/v1/products', productRoutes);
app.use('/cart', cartRoutes);
//app.get('/test', (req, res) => res.send('whats up from AWS'));

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})


module.exports = app