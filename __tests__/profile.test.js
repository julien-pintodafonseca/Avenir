/**
 * @jest-environment node
 */
const app = require('../app')
const request = require('supertest')

let token
beforeAll(async () => {
    const response = await request(app).post('/account/login').send({ email: 'root@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
    token = response.body.token
})

describe('GET /api/profile', () => {
    test('get profile of user', async () => {
        const response = await request(app)
            .get('/api/profile')
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body.data.email).toBe('root@avenir.fr')
    })
})

describe('PUT /api/profile', () => {
    test('Change password', async () => {
        const response = await request(app)
            .put('/api/profile')
            .send({ password: 'Qsdfg123!', password2: 'Qsdfg123!' })
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('ok')
    })

    afterAll(async () => {
        const response = await request(app)
            .put('/api/profile')
            .send({ password: 'Azerty123!', password2: 'Azerty123!' })
            .set('authorization', token)
    });
    
})


describe('POST /api/profile', () => {
    test('Active voucher', async () => {
        const response = await request(app)
            .post('/api/profile')
            .send({ voucher: 'AAAA' })
            .set('authorization', token)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('ok')
    })
})

describe('POST /api/profile BAD', () => {
    test('Voucher not valid', async () => {
        const response = await request(app)
            .post('/api/profile')
            .send({ voucher: 'BBBB' })
            .set('authorization', token)
        expect(response.statusCode).toBe(403)
        expect(response.body.error).toBe('Voucher not valid')
    })

    test('Voucher already used', async () => {
        const response = await request(app)
            .post('/api/profile')
            .send({ voucher: 'CCCC' })
            .set('authorization', token)
        expect(response.statusCode).toBe(403)
        expect(response.body.error).toBe('Voucher already used')
    })

    test('Expiration date of current voucher is higher', async () => {
        const response = await request(app)
            .post('/api/profile')
            .send({ voucher: 'DDDD' })
            .set('authorization', token)
        expect(response.statusCode).toBe(200)

        const response2 = await request(app).post('/account/login').send({ email: 'root@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
        let token2 = response2.body.token

        const response3 = await request(app)
            .post('/api/profile')
            .send({ voucher: 'EEEE' })
            .set('authorization', token2)
        expect(response3.statusCode).toBe(403)
        expect(response3.body.error).toBe('Impossible to use your voucher now ! The date of expiration of your current voucher is higher !')
    })

    test('Date of current voucher is lesser', async () => {
        const response = await request(app)
            .post('/api/profile')
            .send({ voucher: 'FFFF' })
            .set('authorization', token)
        expect(response.statusCode).toBe(200)

        const response2 = await request(app).post('/account/login').send({ email: 'root@avenir.fr', password: 'Azerty123!' }).set('Accept', 'application/json')
        let token2 = response2.body.token

        const response3 = await request(app)
            .post('/api/profile')
            .send({ voucher: 'GGGG' })
            .set('authorization', token2)
        expect(response3.statusCode).toBe(200)
        expect(response3.body.msg).toBe('ok')
    })
})

