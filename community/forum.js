// community/forum.js

class Forum {
    constructor(dao) {
        this.threads = new Map(); // Map to hold threads
        this.users = new Set(); // Set to hold registered users
        this.dao = dao; // DAO instance for governance
    }

    // Register a new user
    registerUser (username) {
        if (this.users.has(username)) {
            throw new Error('User  already exists');
        }
        this.users.add(username);
    }

    // Create a new thread with governance approval
    async createThread(title, content, author) {
        if (!this.users.has(author)) {
            throw new Error('User  not registered');
        }

        // Propose thread creation to DAO
        const proposalId = await this.dao.propose('CreateThread', { title, content, author });
        return proposalId; // Return proposal ID for tracking
    }

    // Post a reply to a thread
    async postReply(threadId, content, author) {
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
