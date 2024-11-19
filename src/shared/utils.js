import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');

export const subscribeToUpdates = (callback) => {
    socket.on('update', (data) => {
        callback(data);
    });
};

export const emitUpdate = (data) => {
    socket.emit('update', data);
};
