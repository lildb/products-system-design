const request = require('supertest')
const app = require('../../server.js')

describe('/GET products', () => {
  it('should return 200 status code upon successful request', () => {
    request(app, (err, endpoint) => {
      endpoint.get('/api/v1/products', (err, response) => {
        expect(response.status).toBe(200);
      })
    })
  })
  it('should return a JSON response', () => {
    request(app, (err, endpoint) => {
      endpoint.get('/api/v1/products', (err, response) => {
        expect('Content-Type', /json/)
      })
    })
  })
  it('should invoke a callback', () => {
    const callback = jest.fn();
    request(app, (err, endpoint) => {
      endpoint.get('/api/v1/products', (err, response) => {
        expect(callback).toHaveBeenCalled()
      })
    })
  })
});

describe('/GET cart', () => {
  it('should return 200 status code', () => {
    request(app, (err, endpoint) => {
      endpoint.get('/cart', (err, response) => {
        expect(response.status).toBe(200);
      })
    })
  })
})

describe('/POST cart', () => {
  const cartData = { sku_id: 83 }

  it('should return a 200 status code', () => {
    request(app, (err, endpoint) => {
      endpoint.post('/cart', (err, response) => {
        expect(response.status).toBe(200)
      })
    })
  })
  it('should add item to shopping cart', () => {
    request(app, (err, endpoint) => {
      endpoint.send(cartData, (err, response) => {
        expect(response.status).toBe(200)
      })
    })
  })
})


// should return json object
// should return 200 status code
// should specify json in content type header