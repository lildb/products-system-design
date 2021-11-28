const express = require('express')
const router = express.Router()
const {
  fetchProducts,
  fetchProductInfo,
  fetchStyles,
  fetchRelated,
  fetchTest,
} = require('../controllers/controller.Product')

router.get('/', fetchProducts);

router.get('/:product_id', fetchProductInfo);

router.get('/:product_id/styles', fetchStyles);

router.get('/:product_id/related', fetchRelated);


module.exports = router
