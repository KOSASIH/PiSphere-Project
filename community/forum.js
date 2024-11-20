// community/forum.js

class Forum {
    constructor() {
        this.threads = new Map(); // Map to hold threads
        this.users = new Set(); // Set to hold registered users
    }

    // Register a new user
    registerUser (username) {
        if (this.users.has(username)) {
            throw new Error('User  already exists');
        }
        this.users.add(username);
    }

    // Create a new thread
    createThread(title, content, author) {
        if (!this.users.has(author)) {
            throw new Error('User  not registered');
        }

        const threadId = this.threads.size + 1; // Simple ID generation
        const thread = {
            id: threadId,
            title,
            content,
            author,
            replies: [],
            createdAt: new Date(),
        };

        this.threads.set(threadId, thread);
        return thread;
    }

    // Post a reply to a thread
    postReply(threadId, content, author) {
        if (!this.users.has(author)) {
            throw new Error('User  not registered');
        }

        const thread = this.threads.get(threadId);
        if (!thread) {
            throw new Error('Thread does not exist');
        }

        const reply = {
            content,
            author,
            createdAt: new Date(),
        };

        thread.replies.push(reply);
        return reply;
    }

    // Get all threads
    getThreads() {
        return Array.from(this.threads.values());
    }

    // Get a specific thread by ID
    getThread(threadId) {
        const thread = this.threads.get(threadId);
        if (!thread) {
            throw new Error('Thread does not exist');
        }
        return thread;
    }

    // Moderate a thread (e.g., delete)
    moderateThread(threadId) {
        if (!this.threads.has(threadId)) {
            throw new Error('Thread does not exist');
        }
        this.threads.delete(threadId);
    }
}

module.exports = Forum;
