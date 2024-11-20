// analytics/api.js

const API_URL = 'https://api.yourdomain.com/analytics'; // Replace with your actual API URL

export const fetchAnalyticsData = async () => {
    const response = await fetch(`${API_URL}/data`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch analytics data');
    }
    const data = await response.json();
    return data;
};
