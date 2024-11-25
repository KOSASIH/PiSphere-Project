// src/utils/dataAnalytics.js
class DataAnalytics {
    static analyzeUser Behavior(userActions) {
        const actionCounts = userActions.reduce((acc, action) => {
            acc[action] = (acc[action] || 0) + 1;
            return acc;
        }, {});
        return actionCounts;
    }

    static analyzeMarketTrends(prices) {
        const trends = {
            upward: 0,
            downward: 0,
            stable: 0,
        };

        for (let i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                trends.upward++;
            } else if (prices[i] < prices[i - 1]) {
                trends.downward++;
            } else {
                trends.stable++;
            }
        }
        return trends;
    }
}

module.exports = DataAnalytics;
