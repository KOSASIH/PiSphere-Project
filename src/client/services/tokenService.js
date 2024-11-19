// tokenService.js

const TOKEN_KEY = 'token'; // Key for storing the token in local storage

// Function to save the token to local storage
export const saveToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Function to retrieve the token from local storage
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// Function to remove the token from local storage
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    const token = getToken();
    return token !== null; // Returns true if a token exists
};

// Function to decode the token (optional)
export const decodeToken = (token) => {
    if (!token) return null;
    const payload = token.split('.')[1]; // Get the payload part of the JWT
    return JSON.parse(atob(payload)); // Decode the base64 payload
};

// Function to get user information from the token
export const getUser FromToken = () => {
    const token = getToken();
    return decodeToken(token);
};
