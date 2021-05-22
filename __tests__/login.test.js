const app = require('../app')
const request = require('supertest')
const jws = require('jws')
describe('GET /login', () => {
  test('It should respond with valid JWT token', async () => {
    const response = await request(app)
      .post('/login')
      .send({ login: 'viardots', password: '123456' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(202)
    expect(response.body.msg).toBe('ok')
    const tokenDecoded = JSON.parse(jws.decode(response.body.token, 'HS256', '????').payload)
    expect(tokenDecoded.sub).toBe('viardots')
  })
})

describe('GET /login BAD ', () => {
  test('It should respond with valid JWT token', async () => {
    const response = await request(app)
      .post('/login')
      .send({ login: 'viardots', password: '12345' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(403)
    expect(response.body.msg).toBe('ko')
  })
})
