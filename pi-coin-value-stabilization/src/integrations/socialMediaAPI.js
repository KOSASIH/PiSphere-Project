// src/integrations/socialMediaAPI.js
const axios = require('axios');

class SocialMediaAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.socialmedia.com/v1';
    }

    async postUpdate(message) {
        try {
            const response = await axios.post(`${this.baseUrl}/posts`, {
                message
            }, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error posting update:', error);
            throw error;
        }
    }

    async getFeed() {
        try {
            const response = await axios.get(`${this.baseUrl}/feed`, {
                headers: { 'Authorization': `Bearer ${this.apiKey}` }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching feed:', error);
            throw error;
        }
    }
}

module.exports = SocialMediaAPI;
