// marketMonitoring.js
const axios = require('axios');

class MarketMonitoring {
    constructor(targetPrice) {
        this.targetPrice = targetPrice;
        this.alertThreshold = 10; // Price change threshold
    }

    async monitorMarket() {
        const priceData = await this.fetchPriceData();
        this.checkForAlerts(priceData);
    }

    async fetchPriceData() {
        const response = await axios.get('https://api.example.com/prices');
        return response.data;
    }

    checkForAlerts(priceData) {
        priceData.forEach((data) => {
            if (Math.abs(data.price - this.targetPrice) > this.alertThreshold) {
                this.sendAlert(data);
            }
        });
    }

    sendAlert(data) {
        console.log(`Alert! Price deviation detected: ${data.price}`);
    }
}

module.exports = MarketMonitoring;
