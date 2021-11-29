const {
  fetchProducts,
  fetchProductInfo,
} = require('../controllers/controller.Product.js')



describe('fetchProducts handler function', () => {

  it('should be of type function', () => {
    expect(typeof fetchProducts).toBe('function');
  })
})