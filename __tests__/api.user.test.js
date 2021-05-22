const app = require('../app')
const request = require('supertest')
let token
beforeAll(async () => {
  const response = await request(app).post('/login').send({ login: 'viardots', password: '123456' }).set('Accept', 'application/json')
  token = response.body.token
})

describe('GET /api/user', () => {
  test('With correct token it should return correct login', async () => {
    const response = await request(app)
      .get('/api/user')
      .set('authorization', token)
    expect(response.statusCode).toBe(200)
    expect(response.body.username).toBe('viardots')
  })
})

describe('GET /api/user', () => {
  test('With fake token it should return an error', async () => {
    const response = await request(app)
      .get('/api/user')
      .set('authorization', 'xxx')
    expect(response.statusCode).toBe(403)
  })
})
