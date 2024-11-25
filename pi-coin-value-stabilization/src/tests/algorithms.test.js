// tests/algorithms.test.js
const PriceStabilityUtils = require('../utils/priceStabilityUtils');

describe('PriceStabilityUtils', () => {
    test('calculateAveragePrice should return the correct average', () => {
        const prices = [100, 200, 300];
        const average = PriceStabilityUtils.calculateAveragePrice(prices);
        expect(average).toBe(200);
    });

    test('calculatePriceDeviation should return correct deviations', () => {
        const prices = [100, 200, 300];
        const average = PriceStabilityUtils.calculateAveragePrice(prices);
        const deviations = PriceStabilityUtils.calculatePriceDeviation(prices, average);
        expect(deviations).toEqual([100, 0, 100]);
    });

    test('isPriceStable should return true for stable prices', () => {
        const prices = [100, 102, 101];
        const threshold = 5;
        expect(PriceStabilityUtils.isPriceStable(prices, threshold)).toBe(true);
    });

    test('isPriceStable should return false for unstable prices', () => {
        const prices = [100, 200, 300];
        const threshold = 50;
        expect(PriceStabilityUtils.isPriceStable(prices, threshold)).toBe(false);
    });
});
