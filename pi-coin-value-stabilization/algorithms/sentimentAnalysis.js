// sentimentAnalysis.js
const axios = require('axios');
const Sentiment = require('sentiment');

class SentimentAnalysis {
    constructor() {
        this.sentiment = new Sentiment();
    }

    async analyzeSentiment() {
        const tweets = await this.fetchTweets();
        const sentimentScore = this.calculateSentiment(tweets);
        return sentimentScore;
    }

    async fetchTweets() {
        const response = await axios.get('https://api.twitter.com/2/tweets/search/recent?query=PiCoin');
        return response.data.data;
    }

    calculateSentiment(tweets) {
        let totalScore = 0;
        tweets.forEach(tweet => {
            const result = this.sentiment .analyze(tweet.text);
            totalScore += result.score;
        });
        return totalScore / tweets.length;
    }
}

module.exports = SentimentAnalysis;
