const express = require('express')
const router = express.Router()
const {
  fetchCart,
  addToCart,
} = require('../controllers/controller.Cart')

router.get('/', fetchCart);
router.post('/', addToCart);

module.exports = router;