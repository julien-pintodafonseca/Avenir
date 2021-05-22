const app = require('../app')
const request = require('supertest')
let token
beforeAll(async () => {
  const response = await request(app).post('/login').send({ login: 'viardots', password: '123456' }).set('Accept', 'application/json')
  token = response.body.token
})

describe('POST /api/gps', () => {
  test('It should insert coordonnees', async () => {
    const coordonnees = { latitude: 45.7, longitude: 2.3 }
    const response = await request(app)
      .post('/api/gps')
      .set('authorization', token)
      .send({ coordonnees })
    expect(response.statusCode).toBe(201)
    const response2 = await request(app)
      .get('/api/gps')
      .set('authorization', token)
    expect(response2.statusCode).toBe(200)
    expect(response2.body.username).toBe('viardots')
    expect(response2.body.coordonnees).toBe(JSON.stringify(coordonnees))
  })
})
