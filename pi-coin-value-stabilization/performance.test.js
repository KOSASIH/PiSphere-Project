// tests/performance.test.js
const { performance } = require('perf_hooks');
const PriceStabilityUtils = require('../utils/priceStabilityUtils');

describe('Performance Tests', () => {
    test('calculateAveragePrice should perform within acceptable limits', () => {
        const prices = Array.from({ length: 100000 }, (_, i) => i + 1);
        const start = performance.now();
        PriceStabilityUtils.calculateAveragePrice(prices);
        const end = performance.now();
        expect(end - start).toBeLessThan(100); // Should complete in less than 100ms
    });
});
