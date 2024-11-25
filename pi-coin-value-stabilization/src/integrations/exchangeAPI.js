// src/integrations/exchangeAPI.js
const axios = require('axios');

class ExchangeAPI {
    constructor(apiKey, secret) {
        this.apiKey = apiKey;
        this.secret = secret;
        this.baseUrl = 'https://api.exchange.com/v1';
    }

    async getMarketData(symbol) {
        try {
            const response = await axios.get(`${this.baseUrl}/market/${symbol}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching market data:', error);
            throw error;
        }
    }

    async placeOrder(symbol, amount, price, orderType) {
        try {
            const response = await axios.post(`${this.baseUrl}/orders`, {
                symbol,
                amount,
                price,
                orderType
            }, {
                headers: {
                    'X-API-KEY': this.apiKey,
                    'X-API-SECRET': this.secret
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error placing order:', error);
            throw error;
        }
    }
}

module.exports = ExchangeAPI;
