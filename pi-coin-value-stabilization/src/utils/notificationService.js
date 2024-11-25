// src/utils/notificationService.js
class NotificationService {
    constructor() {
        this.subscribers = new Map(); // Maps user addresses to their notification preferences
    }

    subscribe(userAddress, method) {
        if (!this.subscribers.has(userAddress)) {
            this.subscribers.set(userAddress, []);
        }
        this.subscribers.get(userAddress).push(method);
    }

    notify(userAddress, message) {
        const methods = this.subscribers.get(userAddress) || [];
        methods.forEach(method => {
            switch (method) {
                case 'email':
                    this.sendEmail(userAddress, message);
                    break;
                case 'sms':
                    this.sendSMS(userAddress, message);
                    break;
                default:
                    console.warn('Unknown notification method:', method);
            }
        });
    }

    sendEmail(userAddress, message) {
        // Implement email sending logic here
        console.log(`Sending email to ${userAddress}: ${message}`);
    }

    sendSMS(userAddress, message) {
        // Implement SMS sending logic here
        console.log(`Sending SMS to ${userAddress}: ${message}`);
    }
}

module.exports = NotificationService;
