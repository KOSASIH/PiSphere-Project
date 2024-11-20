// ai/ai.js

const { Matrix } = require('ml-matrix'); // Matrix operations library
const { KNN } = require('ml-knn'); // K-Nearest Neighbors library

class AI {
    constructor() {
        this.model = null;
    }

    // Preprocess data (normalization, encoding, etc.)
    preprocessData(data) {
        // Example: Normalize numerical features
        const normalizedData = data.map(row => {
            const max = Math.max(...row);
            return row.map(value => value / max);
        });
        return normalizedData;
    }

    // Train a KNN model
    trainKNN(data, labels) {
        const processedData = this.preprocessData(data);
        this.model = new KNN(processedData, labels, { k: 3 });
    }

    // Predict using the trained model
    predict(input) {
        if (!this.model) {
            throw new Error('Model is not trained');
        }
        const processedInput = this.preprocessData([input]);
        return this.model.predict(processedInput);
    }

    // Evaluate model accuracy
    evaluate(testData, testLabels) {
        const predictions = testData.map(row => this.predict(row));
        const accuracy = predictions.filter((pred, index) => pred === testLabels[index]).length / testLabels.length;
        return accuracy;
    }
}

module.exports = AI;
