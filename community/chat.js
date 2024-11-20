// community/chat.js

const WebSocket = require('ws');

class Chat {
    constructor() {
        this.rooms = new Map(); // Map to hold chat rooms
        this.users = new Set(); // Set to hold registered users
        this.wss = new WebSocket.Server({ noServer: true }); // WebSocket server
    }

    // Register a new user
    registerUser (username) {
        if (this.users.has(username)) {
            throw new Error('User  already exists');
        }
        this.users.add(username);
    }

    // Create a new chat room
    createRoom(roomName) {
        if (this.rooms.has(roomName)) {
            throw new Error('Room already exists');
        }
        this.rooms.set(roomName, { messages: [] });
    }

    // Send a message to a room
    sendMessage(roomName, username, message) {
        if (!this.users.has(username)) {
            throw new Error('User  not registered');
        }

        const room = this.rooms.get(roomName);
        if (!room) {
            throw new Error('Room does not exist');
        }

        const chatMessage = {
            username,
            message,
            timestamp: new Date(),
        };

        room.messages.push(chatMessage);
        this.broadcast(roomName, chatMessage);
    }

    // Broadcast a message to all users in a room
    broadcast(roomName, message) {
        this.wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client.room === roomName) {
                client.send(JSON.stringify(message));
            }
        });
    }

    // Handle WebSocket connections
    handleConnection(server) {
        server.on('upgrade', (request, socket, head) => {
            this.wss.handleUpgrade(request, socket, head, (ws) => {
                this.wss.emit('connection', ws, request);
            });
        });

        this.wss.on('connection', (ws, request) => {
            ws.on('message', (message) => {
                const { roomName, username, text } = JSON.parse(message);
                this.sendMessage(roomName, username, text);
            });

            ws.on('close', () => {
                // Handle user disconnection if needed
            });
        });
    }
}

module.exports = Chat;
