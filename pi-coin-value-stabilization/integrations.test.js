// tests/integrations.test.js
const MarketDataFetcher = require('../utils/marketDataFetcher');

describe('MarketDataFetcher', () => {
    let marketDataFetcher;

    beforeEach(() => {
        marketDataFetcher = new MarketDataFetcher();
    });

    test('fetchPrice should return prices from multiple sources', async () => {
        const prices = await marketDataFetcher.fetchPrice('BTCUSDT');
        expect(prices).toHaveProperty('binance');
        expect(prices).toHaveProperty('coinbase');
    });

    test('fetchPrice should throw an error for invalid symbol', async () => {
        await expect(marketDataFetcher.fetchPrice('INVALID')).rejects.toThrow();
    });
});
