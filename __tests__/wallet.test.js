/**
 * @jest-environment node
 */
const app = require('../App')
const request = require('supertest')

let token
beforeAll(async () => {
    const response = await request(app).post('/account/login').send({ email: 'guest@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
    token = response.body.token
})

describe('GET /api/wallet', () => {
    const expected = "data"
    test('Get crypto from user wallet', async () => {
        const response = await request(app)
            .get('/api/wallet')
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty(expected)
    })
})

describe('GET /api/wallet/symbols', () => {
    const expected = "data"
    test('Get crypto from database', async () => {
        const response = await request(app)
            .get('/api/wallet/symbols')
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty(expected)
    })
})

describe('POST /api/wallet/:id/:amount', () => {
    const expected = "ok"
    test('amount Integer', async () => {
        const response = await request(app)
            .post('/api/wallet/10/250')
            .set('authorization', token)
        expect(response.statusCode).toBe(201)
        expect(response.body.msg).toBe(expected)
    })

    test('amount Float', async () => {
        const response = await request(app)
            .post('/api/wallet/11/250.45')
            .set('authorization', token)
        expect(response.statusCode).toBe(201)
        expect(response.body.msg).toBe(expected)
    })
})

describe('POST /api/wallet/:id/:amount BAD', () => {
    const expected = ":id must be a number higher or equal to 1"
    test('id <= 0', async () => {
        const response = await request(app)
            .post('/api/wallet/-10/230')
            .set('authorization', token)
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe(expected)
    })
    
    const expected2 = ":amount must be a number higher to 0"
    test('Integer amount <= 0', async () => {
        const response = await request(app)
            .post('/api/wallet/5/-230')
            .set('authorization', token)
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe(expected2)
    })

    const expected3 = ":amount must be a number higher to 0"
    test('Float amount <= 0', async () => {
        const response = await request(app)
            .post('/api/wallet/3/-230.484')
            .set('authorization', token)
        expect(response.statusCode).toBe(400)
        expect(response.body.error).toBe(expected3)
    })
    
})

describe('DELETE /api/wallet/:id', () => {
    const expected = "ok"
    test('Delete crypto from wallet', async () => {
        const response = await request(app)
            .delete('/api/wallet/1')
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe(expected)
    })
})

describe('PUT /api/wallet/:id', () => {
    test('Change amount of a crypto', async () => {
        const response = await request(app)
            .put('/api/wallet/1478')
            .send({ amount: 478.54 })
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('ok')
    })
})