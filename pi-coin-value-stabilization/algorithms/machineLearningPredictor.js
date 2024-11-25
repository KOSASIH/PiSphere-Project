// machineLearningPredictor.js
const tf = require('@tensorflow/tfjs');

class MachineLearningPredictor {
    constructor() {
        this.model = this.createModel();
    }

    createModel() {
        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [10] }));
        model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
        model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
        return model;
    }

    async trainModel(trainingData, labels) {
        const xs = tf.tensor2d(trainingData);
        const ys = tf.tensor2d(labels);
        await this.model.fit(xs, ys, { epochs: 100 });
    }

    async predict(inputData) {
        const inputTensor = tf.tensor2d([inputData]);
        const prediction = this.model.predict(inputTensor);
        return prediction.dataSync()[0];
    }
}

module.exports = MachineLearningPredictor;
