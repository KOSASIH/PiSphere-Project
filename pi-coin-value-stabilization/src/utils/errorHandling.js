// src/utils/errorHandling.js
class ErrorHandling {
    static handleError(error) {
        // Log the error and provide a user-friendly message
        LoggingService.logError(error.message);
        return { success: false, message: 'An error occurred. Please try again later.' };
    }

    static validateInput(input, schema) {
        const validationErrors = schema.validate(input);
        if (validationErrors.length > 0) {
            throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
        }
    }
}

module.exports = ErrorHandling;
