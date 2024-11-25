// volatilityManagement.js
class VolatilityManagement {
    constructor(targetPrice) {
        this.targetPrice = targetPrice;
        this.volatilityThreshold = 0.05; // 5% volatility threshold
    }

    assessVolatility(priceHistory) {
        const meanPrice = this.calculateMean(priceHistory);
        const volatility = this.calculateStandardDeviation(priceHistory, meanPrice);
        return volatility > this.volatilityThreshold;
    }

    calculateMean(prices) {
        const total = prices.reduce((acc, price) => acc + price, 0);
        return total / prices.length;
    }

    calculateStandardDeviation(prices, mean) {
        const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
        return Math.sqrt(variance);
    }
}

module.exports = VolatilityManagement;
