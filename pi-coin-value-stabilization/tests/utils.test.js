// tests/utils.test.js
const PriceStabilityUtils = require('../utils/priceStabilityUtils');
const NotificationService = require('../utils/notificationService');

describe('Utility Functions', () => {
    test('PriceStabilityUtils should calculate average price correctly', () => {
        const prices = [150, 250, 350];
        const average = PriceStabilityUtils.calculateAveragePrice(prices);
        expect(average).toBe(250);
    });

    test('NotificationService should notify users correctly', () => {
        const notificationService = new NotificationService();
        notificationService.subscribe('user@example.com', 'email');
        const spy = jest.spyOn(notificationService, 'sendEmail');
        notificationService.notify('user@example.com', 'Price has changed!');
        expect(spy).toHaveBeenCalledWith('user@example.com', 'Price has changed!');
    });
});
