// src/integrations/paymentProcessorAPI.js
const axios = require('axios');

class PaymentProcessorAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.paymentprocessor.com/v1';
    }

    async createPayment(amount, currency, recipient) {
        try {
            const response = await axios.post(`${this.baseUrl}/payments`, {
                amount,
                currency,
                recipient
            }, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw error;
        }
    }

    async getPaymentStatus(paymentId) {
        try {
            const response = await axios.get(`${this.baseUrl}/payments/${paymentId}`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data.status;
        } catch (error) {
            console.error('Error fetching payment status:', error);
            throw error;
        }
    }
}

module.exports = PaymentProcessorAPI;
