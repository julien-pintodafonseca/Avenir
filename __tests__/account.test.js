const app = require('../App')
const request = require('supertest')
const jws = require('jws')
require('mandatoryenv').load(['SECRETJWS', 'BACKEND'])

describe('POST /account/login', () => {
  test('It should respond with a json object that contains a token', async () => {
    const response = await request(app)
      .post('/account/login')
      .send({ email: 'root@avenir.fr', password: 'Azerty123!' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(202)
    expect(response.body).toHaveProperty('token')
    const tokenDecoded = JSON.parse(jws.decode(response.body.token, 'HS256', process.env.SECRETJWS).payload)
    expect(tokenDecoded.sub).toBe('root@avenir.fr')
  })
})

describe('POST /account/login BAD ', () => {
  const expected = 'Connection refused'
  test('Connection refused', async () => {
    const response = await request(app)
      .post('/account/login')
      .send({ email: 'error@avenir.fr', password: 'NotWorking123!' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(403)
    expect(response.body.error).toBe(expected)
  })
})

describe('POST /account/registration', () => {
  const expected = 'Account created'
  test('Account created', async () => {
    const response = await request(app)
      .post('/account/registration')
      .send({ email: 'newaccount@avenir.fr', password: 'Working123!', password2: 'Working123!' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(201)
    expect(response.body.msg).toBe(expected)
  })
})

describe('POST /account/registration BAD', () => {
  const expected = 'Email invalid'
  test('Email invalid', async () => {
    const response = await request(app)
      .post('/account/registration')
      .send({ email: 'emailinvalid.fr', password: 'NotWorking123!', password2: 'NotWorking123!' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toContain(expected)
  })

  const expected2 = 'Passwords do not match'
  test('Passwords do not match', async () => {
    const response = await request(app)
      .post('/account/registration')
      .send({ email: 'email@invalid.fr', password: 'NotWorking123!', password2: 'NotSame123!' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toContain(expected2)
  })

  const expected3 = 'Invalid password: Password must contain at least 8 characters, 1 special character, 1 number, one lowercase and 1 one uppercase alphabetical'
  test('Invalid password', async () => {
    const response = await request(app)
      .post('/account/registration')
      .send({ email: 'email@invalid.fr', password: 'Not', password2: 'Not' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toContain(expected3)
  })

  const expected4 = ['Passwords do not match', 'Invalid password: Password must contain at least 8 characters, 1 special character, 1 number, one lowercase and 1 one uppercase alphabetical', 'Email invalid']
  test('All errors', async () => {
    const response = await request(app)
      .post('/account/registration')
      .send({ email: 'emailinvalid.fr', password: 'Not', password2: 'NotSame' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toMatchObject(expected4)
  })

  const expected5 = 'Email already used'
  test('Email already used', async () => {
    const response = await request(app)
      .post('/account/registration')
      .send({ email: 'root@avenir.fr', password: 'Azerty123!', password2: 'Azerty123!' })
      .set('Accept', 'application/json')
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toContain(expected5)
  })
})
