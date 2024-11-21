class StabilityMonitor:
    def __init__(self, stability_mechanism, alert_threshold):
        self.stability_mechanism = stability_mechanism
        self.alert_threshold = alert_threshold

    def check_stability(self):
        current_price = self.stability_mechanism.get_current_price()
        if current_price > self.alert_threshold:
            self.send_alert(f"Price is above the alert threshold: {current_price}")
        else:
            print(f"Price is stable: { current_price}")

    def send_alert(self, message):
        # Logic to send alerts (e.g., email, SMS, or push notifications)
        print(f"ALERT: {message}")
