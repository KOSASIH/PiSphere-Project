// src/integrations/traditionalFinanceAPI.js
const axios = require('axios');

class TraditionalFinanceAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.traditionalfinance.com/v1';
    }

    async getStockPrice(symbol) {
        try {
            const response = await axios.get(`${this.baseUrl}/stocks/${symbol}`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data.price;
        } catch (error) {
            console.error('Error fetching stock price:', error);
            throw error;
        }
    }

    async executeTrade(symbol, amount, tradeType) {
        try {
            const response = await axios.post(`${this.baseUrl}/trades`, {
                symbol,
                amount,
                tradeType
            }, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error executing trade:', error);
            throw error;
        }
    }
}

module.exports = TraditionalFinanceAPI;
