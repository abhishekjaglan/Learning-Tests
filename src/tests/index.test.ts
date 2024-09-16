import { describe, it, expect, vi } from 'vitest'
import request from 'supertest';
import { app } from '../index';
import { prismaClient } from '../__mocks__/db';

// vi.mock('../db', () => ({
//     prismaClient: {sum: { create: vi.fn()}}
// }));

// mock components/functions for testing
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

    // mock values 

    it("should return mocked values for multiply", async() => {
        prismaClient.sum.create.mockResolvedValue({
            a: 5,
            b: 34,
            result: 170,
            id: 1
        });
        const res = await request(app).post('/multiply').send({
            a: 5,
            b: 34
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(170);
        expect(res.body.id).toBe(1);
    });

    // SPY on a function call

    it('should return divided value', async () => {
        prismaClient.sum.create.mockResolvedValue({
            a: 4,
            b: 2,
            result: 2,
            id: 1
        });
        vi.spyOn(prismaClient.sum, 'create');

        const res = await request(app).post('/divide').send({
            a: 4,
            b: 2
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(2);
        expect(res.body.id).toBe(1);
        expect(prismaClient.sum.create).toHaveBeenCalledWith({
            data:{
                a: 4,
                b: 2,
                result: 2
            }
        });
    });
});