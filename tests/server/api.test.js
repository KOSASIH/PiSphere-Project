const request = require('supertest');
const app = require('../src/server/app'); // Assuming your Express app is exported from this file

describe('API Endpoints', () => {
    it('GET /api/proposals should return all proposals', async () => {
        const res = await request(app).get('/api/proposals');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('proposals');
    });

    it('POST /api/proposals should create a new proposal', async () => {
        const res = await request(app)
            .post('/api/proposals')
            .send({ description: 'New Proposal' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('description', 'New Proposal');
    });

    it('GET /api/proposals/:id should return a specific proposal', async () => {
        const res = await request(app).get('/api/proposals/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
    });
});
