// analytics/socket.js

const SOCKET_URL = 'wss://api.yourdomain.com/analytics'; // Replace with your actual WebSocket URL

export const setupWebSocket = (onDataReceived) => {
    const socket = new WebSocket(SOCKET_URL);

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
const newData = JSON.parse(event.data);
        onDataReceived(newData);
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return socket;
};
