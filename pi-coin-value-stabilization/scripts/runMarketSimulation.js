// scripts/runMarketSimulation.js
const MarketDataFetcher = require('../utils/marketDataFetcher');

async function simulateMarketConditions() {
    const marketDataFetcher = new MarketDataFetcher();
    const symbols = ['BTCUSDT', 'ETHUSDT', 'LTCUSDT'];

    for (const symbol of symbols) {
        try {
            const prices = await marketDataFetcher.fetchPrice(symbol);
            console.log(`Market data for ${symbol}:`, prices);
            // Simulate market conditions (e.g., price fluctuations)
            // Add your simulation logic here
        } catch (error) {
            console.error(`Error fetching market data for ${symbol}:`, error);
        }
    }
}

simulateMarketConditions();
