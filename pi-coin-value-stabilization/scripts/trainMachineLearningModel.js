// scripts/trainMachineLearningModel.js
const fs = require('fs');
const { trainModel } = require('../ml/model'); // Assume you have a model training function

async function loadHistoricalData() {
    const data = fs.readFileSync('data/historical_prices.json');
    return JSON.parse(data);
}

async function train() {
    const historicalData = await loadHistoricalData();
    const model = await trainModel(historicalData);
    console.log('Model trained successfully:', model);
}

train().catch(error => {
    console.error('Error training model:', error);
});
