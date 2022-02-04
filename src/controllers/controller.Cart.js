const { pool, connection } = require('../../db/db-config.js');

module.exports = {
  // app.get('/api/v1/cart', fetchCart)
  fetchCart: (req, res) => {
    const queryString = `
      SELECT sku_id, count
      FROM cart
    `;

    pool.query(queryString, (err, result) => {
      if (err) {
        res.status(400).send(err)
      }
      res.status(200).send(result.rows)
    })
  },

  // app.post('/api/v1/cart', addToCart)
  addToCart: (req, res) => {
    const { sku_id: skuId } = req.body;
    const queryString = `
      SELECT sku_id, count
      FROM cart
      WHERE sku_id = $1
    `;

    const queryStringAddInitial = `
      INSERT INTO cart (sku_id, count)
      VALUES ($1, 1)
    `;

    const queryStringIncrement = `
      UPDATE cart
      SET count = count + 1
      WHERE sku_id = $1
    `;

    pool.query(queryString, [ skuId ], (err, result) => {
      if (err) res.status(200).send(err)

      if (result.rows[0] !== undefined) {
        pool.query(queryStringIncrement, [ skuId ], (err, result) => {
          if (err) res.status(200).send(err)
          pool.query(queryString, [ skuId ], (err, result) => {
            if (err) res.status(200).send(err)
            res.send(result.rows)
          })
        })

      } else {

        pool.query(queryStringAddInitial, [ skuId ], (err, result) => {
          if (err) res.status(200).send(err)
          pool.query(queryString, [ skuId ], (err, result) => {
            if (err) res.status(200).send(err)
            res.send(result.rows)
          })
        })
      }
    })
  },
};
