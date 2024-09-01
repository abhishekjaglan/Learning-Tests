import { describe, test, expect, it } from '@jest/globals';
import { multiply, sum } from '../index';


describe('sum module', () => {

    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1,2)).toBe(3);
    });

    test('adds 2 + 3 to equal 3', () => {
        expect(sum(3,2)).toBe(5);
    });

    test('adds 5 + 6 to equal 11', () => {
        expect(sum(5,6)).toBe(11);
    });

});

describe('mulitply', () => {

    it('multiply 2 * 3 equal 6', () => {
        expect(multiply(2,3)).toBe(6);
    });

    it('multiply 5 * -3 equal -15', () => {
        expect(multiply(5,-3)).toBe(-15);
    });

    it('multiply 0 * 3 equal 0', () => {
        expect(multiply(0,3)).toBe(0);
    });

});