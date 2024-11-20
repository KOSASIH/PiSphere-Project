// api/templates.js
const API_URL = 'http://localhost:3000/api/templates';

export const fetchTemplates = async () => {
    const response = await fetch(API_URL);
    return response.json();
};
