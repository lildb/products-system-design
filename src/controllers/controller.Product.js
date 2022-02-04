const { connection, pool } = require('../../db/db-config.js')

module.exports = {
  // app.get('/api/v1/products', fetchProducts);
  fetchProducts: (req, res) => {
    const { page, count } = req.query;
    const queryString = `
      SELECT *
      FROM product
      LIMIT $2
      OFFSET $1
      `;
    const values = [ page || 1, count || 5];

    pool.query(queryString, values, (err, result) => {
      if (err) {
        res.status(200).send(err)
      } else {
        res.json(result.rows)
      }
    });
  },

  // app.get('/api/v1/products/:product_id', fetchProductInfo);
  fetchProductInfo: (req, res) => {
    const { product_id: productId } = req.params;
    const productQuery = `
      SELECT id, name, slogan, description, category, default_price
      FROM product
      WHERE id = $1
    `;
    const featureQuery = `
      SELECT feature, value
      FROM features
      WHERE product_id = $1
    `;
    const values = [ productId ]

    pool.query(productQuery, values, (err, productResult) => {
      if (err) {
        res.status(401).send(err)
      } else {
        pool.query(featureQuery, values, (err, featureResult) => {
          productResult.rows[0].features = featureResult.rows
          res.json(productResult.rows[0])
        })
      }
    });
  },

  // app.get('/api/v1/products/:product_id/styles', fetchStyles);
  fetchStyles: (req, res) => {
    const payload = {};
    const { product_id: productId } = req.params;
    payload.product_id = productId;

    const styleQuery = `
      SELECT id as style_id, name, original_price, sale_price, default_val as default
      FROM styles
      WHERE product_id = $1
    `;

    const photosQuery = `
      SELECT thumbnail_url, url
      FROM photos
      WHERE style_id = $1
    `;

    const skuQuery = `
      SELECT quantity, size
      FROM sku
      WHERE style_id = $1
    `;

    const values = [ productId ];

    pool.query(styleQuery, values, (err, styleOutput) => {
      if (err) {
        res.status(400).send(err)
      } else {
        const stylesSet = styleOutput.rows;
        stylesSet.map(each => console.log(each.style_id))
        payload.results = styleOutput.rows

        payload.results.map(item => {
          item.photos = [];
          let values = [ item.style_id ]
          pool.query(photosQuery, values, (err, photosOutput) => {
            if (err) {
              res.status(400).send(err)
            } else {
              item.photos = photosOutput.rows;
              pool.query(skuQuery, values, (err, skuOutput) => {
                if (err) {
                  res.status(400).send(err)
                } else {
                  item.sku = skuOutput.rows
                  res.send(payload)
                }
              })
            }
          })
        })
      }
    })
  },

  // app.get('/test/:product_id/styles', fetchTest)
  fetchTest: (req, res) => {
    const { product_id: productId } = req.params;

    const testQuery = `
      select json_build_object(
        'product_id', product.product_id,
        'results', ( select json_agg(row_to_json(styles))
              from styles where product_id = $1 )
      )
      from product
      where product_id = $1
    `;

    pool.query(testQuery, [ productId ], (err, output) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).send(output)
    })
  },

  // app.get('api/v1/products/:product_id/related', fetchRelated);
  fetchRelated: (req, res) => {
    const { product_id: productId } = req.params;
    const queryString = `
      SELECT json_agg(related_ids)
      FROM related_product
      WHERE product_id = $1
    `;
    const values = [ productId ];
    pool.query(queryString, values, (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.send(result.rows[0].json_agg)
      }
    });
  },
}
