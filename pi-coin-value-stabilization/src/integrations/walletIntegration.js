// src/integrations/walletIntegration.js
const axios = require('axios');

class WalletIntegration {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.walletprovider.com/v1';
    }

    async getWalletBalance(walletAddress) {
        try {
            const response = await axios.get(`${this.baseUrl}/wallets/${walletAddress}/balance`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data.balance;
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
            throw error;
        }
    }

    async sendFunds(walletAddress, amount) {
        try {
            const response = await axios.post(`${this.baseUrl}/wallets/${walletAddress}/send`,{
                    amount
                },
                {
                    headers: { 'Authorization': `Bearer ${this.apiKey}` }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error sending funds:', error);
            throw error;
        }
    }
}

module.exports = WalletIntegration;
