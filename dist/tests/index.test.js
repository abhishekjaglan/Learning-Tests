"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
(0, globals_1.describe)('POST', () => {
    (0, globals_1.it)('should return the sum of two numbers', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post('/sum').send({
            a: 10,
            b: 20
        });
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(res.body.sum).toBe(30);
    }));
    (0, globals_1.it)('should return the sum of two negative numbers', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post('/sum').send({
            a: -10,
            b: -20
        });
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(res.body.sum).toBe(-30);
    }));
    (0, globals_1.it)('should return error status code due to wrong inputs', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app).post('/sum').send({
            a: 'aerrg',
            b: -20
        });
        (0, globals_1.expect)(res.statusCode).toBe(411);
        (0, globals_1.expect)(res.body.msg).toBe('Wrong Input types');
    }));
    (0, globals_1.it)("should be successfull, sending through headers", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .get('/sum')
            .set({
            a: "1",
            b: "1"
        })
            .send();
        (0, globals_1.expect)(res.statusCode).toBe(200);
        (0, globals_1.expect)(res.body.answer).toBe(2);
    }));
    (0, globals_1.it)("should not be successfull, sending through headers", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(index_1.app)
            .get('/sum')
            .send();
        (0, globals_1.expect)(res.statusCode).toBe(411);
    }));
});
