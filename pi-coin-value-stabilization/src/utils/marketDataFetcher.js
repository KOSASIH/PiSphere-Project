// src/utils/marketDataFetcher.js
const axios = require('axios');

class MarketDataFetcher {
    constructor() {
        this.exchangeUrls = {
            binance: 'https://api.binance.com/api/v3/ticker/price',
            coinbase: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
            // Add more exchanges as needed
        };
    }

    async fetchPrice(symbol) {
        try {
            const binanceResponse = await axios.get(`${this.exchangeUrls.binance}?symbol=${symbol}`);
            const coinbaseResponse = await axios.get(`${this.exchangeUrls.coinbase}&currency=${symbol}`);
            return {
                binance: binanceResponse.data.price,
                coinbase: coinbaseResponse.data.data.amount,
            };
        } catch (error) {
            console.error('Error fetching market data:', error);
            throw error;
        }
    }
}

module.exports = MarketDataFetcher;
