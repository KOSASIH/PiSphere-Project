// ai/recommendation-engine.js

const AI = require('./ai');

class RecommendationEngine {
    constructor() {
        this.ai = new AI();
        this.userItemMatrix = new Map(); // User-Item interaction matrix
        this.itemFeatures = new Map(); // Item features for content-based filtering
    }

    // Add user-item interaction
    addInteraction(userId, itemId, rating) {
        if (!this.userItemMatrix.has(userId)) {
            this.userItemMatrix.set(userId, new Map());
        }
        this.userItemMatrix.get(userId).set(itemId, rating);
    }

    // Add item features for content-based filtering
    addItemFeatures(itemId, features) {
        this.itemFeatures.set(itemId, features);
    }

    // Generate recommendations using collaborative filtering
    recommendCollaborative(userId, topN = 5) {
        const userRatings = this.userItemMatrix.get(userId);
        if (!userRatings) {
            throw new Error('User  has no interactions');
        }

        const similarUsers = this.findSimilarUsers(userId);
        const recommendations = new Map();

        similarUsers.forEach((similarUser ) => {
            const similarUser Ratings = this.userItemMatrix.get(similarUser );
            for (const [itemId, rating] of similarUser Ratings) {
                if (!userRatings.has(itemId)) {
                    if (!recommendations.has(itemId)) {
                        recommendations.set(itemId, 0);
                    }
                    recommendations.set(itemId, recommendations.get(itemId) + rating);
                }
            }
        });

        return Array.from(recommendations.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(([itemId]) => itemId);
    }

    // Find similar users based on cosine similarity
    findSimilarUsers(userId) {
        const userRatings = this.userItemMatrix.get(userId);
        const similarities = new Map();

        this.userItemMatrix.forEach((ratings, otherUser Id) => {
            if (otherUser Id !== userId) {
                const similarity = this.cosineSimilarity(userRatings, ratings);
                similarities.set(otherUser Id, similarity);
            }
        });

        return Array.from(similarities.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([userId]) => userId);
    }

    // Calculate cosine similarity between two users
    cosineSimilarity(ratingsA, ratingsB) {
        const intersection = [...ratingsA.keys()].filter(item => ratingsB.has(item));
        if (intersection.length === 0) return 0;

        const dotProduct = intersection.reduce((sum, item) => sum +ratingsA.get(item) * ratingsB.get(item), 0);
        const magnitudeA = Math.sqrt([...ratingsA.values()].reduce((sum, rating) => sum + rating ** 2, 0));
        const magnitudeB = Math.sqrt([...ratingsB.values()].reduce((sum, rating) => sum + rating ** 2, 0));

        return dotProduct / (magnitudeA * magnitudeB);
    }

    // Generate recommendations using content-based filtering
    recommendContentBased(userId, topN = 5) {
        const userRatings = this.userItemMatrix.get(userId);
        if (!userRatings) {
            throw new Error('User has no interactions');
        }

        const recommendations = new Map();
        userRatings.forEach((rating, itemId) => {
            const features = this.itemFeatures.get(itemId);
            if (features) {
                this.itemFeatures.forEach((otherFeatures, otherItemId) => {
                    if (!userRatings.has(otherItemId)) {
                        const similarity = this.cosineSimilarity(new Map([[itemId, rating]]), new Map([[otherItemId, 1]]));
                        if (!recommendations.has(otherItemId)) {
                            recommendations.set(otherItemId, 0);
                        }
                        recommendations.set(otherItemId, recommendations.get(otherItemId) + similarity);
                    }
                });
            }
        });

        return Array.from(recommendations.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, topN)
            .map(([itemId]) => itemId);
    }

    // Generate hybrid recommendations
    recommendHybrid(userId, topN = 5) {
        const collaborativeRecommendations = this.recommendCollaborative(userId, topN);
        const contentBasedRecommendations = this.recommendContentBased(userId, topN);

        const combinedRecommendations = new Set([...collaborativeRecommendations, ...contentBasedRecommendations]);
        return Array.from(combinedRecommendations).slice(0, topN);
    }
}

module.exports = RecommendationEngine;
