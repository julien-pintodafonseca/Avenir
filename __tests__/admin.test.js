/**
 * @jest-environment node
 */
const app = require('../App')
const request = require('supertest')

let token
beforeAll(async () => {
    const response = await request(app).post('/account/login').send({ email: 'root@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
    token = response.body.token
})

describe('GET /api/admin BAD', () => {
    let token2
    beforeAll(async () => {
        const response = await request(app).post('/account/login').send({ email: 'guest@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
        token2 = response.body.token
    })

    const expected = "Forbidden !"
    test('User not admin trying to access admin panel', async () => {
        const response = await request(app)
            .get('/api/admin')
            .set('authorization', token2)
        expect(response.statusCode).toBe(403)
        expect(response.body.error).toBe(expected)
    })
})

describe('GET /api/admin', () => {
    const expected = 'list_crypto'
    test('Get all crypto from API Coinmarket', async () => {
        const response = await request(app)
            .get('/api/admin')
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty(expected)
    })
})

describe('GET /api/admin/symbols', () => {
    const expected = 'data'
    test('Get all crypto from our API', async () => {
        const response = await request(app)
            .get('/api/admin/symbols')
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty(expected)
    })
})

describe('PUT /api/admin/1/0', () => {
    test('Change status active of crypto', async () => {
        const response = await request(app)
            .put('/api/admin/1/0')
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('ok')
    })
})

describe('PUT /api/admin BAD', () => {
    test('id <= 0', async () => {
        const response = await request(app)
            .put('/api/admin/-1/0')
            .set('authorization', token)
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe(':id must be a number higher or equal to 1')
    })

    test('Active > 1', async () => {
        const response = await request(app)
            .put('/api/admin/1/5')
            .set('authorization', token)
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe(':active is 0 or 1')
    })

    test('Active < 0', async () => {
        const response = await request(app)
            .put('/api/admin/1/-5')
            .set('authorization', token)
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe(':active is 0 or 1')
    })
})

describe('POST /api/admin/1000/Binance Coin/BNB', () => {
    test('Add a crpyto', async () => {
        const response = await request(app)
            .post('/api/admin/1000/Binance Coin/BNB')
            .set('authorization', token)
        expect(response.statusCode).toBe(201)
        expect(response.body.msg).toBe('ok')
    })
})

describe('POST /api/admin/1000/Binance Coin/BNB', () => {
    test('id <= 0', async () => {
        const response = await request(app)
            .post('/api/admin/-1000/Binance Coin/BNB')
            .set('authorization', token)
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe(':id must be a number higher or equal to 1')
    })
})