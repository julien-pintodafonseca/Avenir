/**
 * @jest-environment node
 */
const app = require('../App')
const request = require('supertest')

let token
beforeAll(async () => {
  const response = await request(app).post('/account/login').send({ email: 'guestpremium@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
  token = response.body.token
})

describe('GET /api/cryptocurrency', () => {
  const expected = 'data'
  test('Get crypto from user wallet', async () => {
    const response = await request(app)
      .get('/api/wallet')
      .set('authorization', token)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty(expected)
  })
})

describe('GET /api/cryptocurrency/:id', () => {
  test('Get market from a specific crypto from id', async () => {
    const response = await request(app)
      .get('/api/cryptocurrency/4000')
      .set('authorization', token)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('list_time')
    expect(response.body).toHaveProperty('list_price')
  })
})

describe('GET /api/cryptocurrency/:id BAD', () => {
  const expected = ':id must be a number higher or equal to 1'
  test('id <= 1', async () => {
    const response = await request(app)
      .get('/api/cryptocurrency/-10')
      .set('authorization', token)
    expect(response.statusCode).toBe(400)
    expect(response.body.error).toBe(expected)
  })
})

describe('Test isPremium function', () => {
  let token2
  beforeAll(async () => {
    const response = await request(app).post('/account/login').send({ email: 'guestvouchernotvalid@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
    token2 = response.body.token
  })

  const expected = 'Your voucher is not valid'
  test('voucher not valid', async () => {
    const response = await request(app)
      .get('/api/cryptocurrency/')
      .set('authorization', token2)
    expect(response.statusCode).toBe(403)
    expect(response.body.error).toBe(expected)
  })
})

describe('Test isPremium function', () => {
  let token2
  beforeAll(async () => {
    const response = await request(app).post('/account/login').send({ email: 'guestvoucherexpired@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
    token2 = response.body.token
  })

  const expected = 'Your voucher has expired'
  test('voucher expired', async () => {
    const response = await request(app)
      .get('/api/cryptocurrency/')
      .set('authorization', token2)
    expect(response.statusCode).toBe(403)
    expect(response.body.error).toBe(expected)
  })
})
