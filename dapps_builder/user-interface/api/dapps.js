// api/dapps.js
const API_URL = 'http://localhost:3000/api/dapps';

export const fetchDApps = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const createDApp = async (dapp) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dapp),
    });
    return response.json();
};
