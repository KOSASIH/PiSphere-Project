// src/utils/loggingService.js
class LoggingService {
    static logInfo(message) {
        console.log(`[INFO] ${new Date().toISOString()}: ${message}`);
    }

    static logWarning(message) {
console.warn(`[WARNING] ${new Date().toISOString()}: ${message}`);
    }

    static logError(message) {
        console.error(`[ERROR] ${new Date().toISOString()}: ${message}`);
    }
}

module.exports = LoggingService;
