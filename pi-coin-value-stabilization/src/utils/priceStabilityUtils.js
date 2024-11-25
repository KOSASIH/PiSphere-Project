// src/utils/priceStabilityUtils.js
class PriceStabilityUtils {
    static calculateAveragePrice(prices) {
        const total = prices.reduce((acc, price) => acc + parseFloat(price), 0);
        return total / prices.length;
    }

    static calculatePriceDeviation(prices, averagePrice) {
        return prices.map(price => Math.abs(price - averagePrice));
    }

    static isPriceStable(prices, threshold) {
        const averagePrice = this.calculateAveragePrice(prices);
        const deviations = this.calculatePriceDeviation(prices, averagePrice);
        const maxDeviation = Math.max(...deviations);
        return maxDeviation <= threshold;
    }
}

module.exports = PriceStabilityUtils;
