import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import { app } from '../index';

describe('POST', () => {

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

})