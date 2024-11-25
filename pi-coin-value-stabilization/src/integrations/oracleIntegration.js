// src/integrations/oracleIntegration.js
const axios = require('axios');

class OracleIntegration {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.priceoracle.com/v1';
    }

    async getPrice(symbol) {
        try {
            const response = await axios.get(`${this.baseUrl}/prices/${symbol}`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data.price;
        } catch (error) {
            console.error('Error fetching price:', error);
            throw error;
        }
    }
}

module.exports = OracleIntegration;
