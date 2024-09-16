import { describe, it, expect, vi } from 'vitest'
import request from 'supertest';
import { app } from '../index';

// vi.mock('../db', () => ({
//     prismaClient: {sum: { create: vi.fn()}}
// }));

vi.mock('../db');

describe('Testss', () => {

    it('should return the sum of two numbers', async() => {
        const res = await request(app).post('/sum').send({
            a:10,
            b:20
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.sum).toBe(30);
    });

    it('should return the sum of two negative numbers', async() => {
        const res = await request(app).post('/sum').send({
            a:-10,
            b:-20
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.sum).toBe(-30);
    });
    
    it('should return error status code due to wrong inputs', async() => {
        const res = await request(app).post('/sum').send({
            a:'aerrg',
            b:-20
        });
        expect(res.statusCode).toBe(411);
        expect(res.body.msg).toBe('Wrong Input types');
    });

    it("should be successfull, sending through headers", async() => {
        const res = await request(app)
        .get('/sum')
        .set({
            a:"1",
            b:"1"
        })
        .send();

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(2);

    });

    it("should not be successfull, sending through headers", async() => {
        const res = await request(app)
        .get('/sum')
        .send();

        expect(res.statusCode).toBe(411);

    });
})