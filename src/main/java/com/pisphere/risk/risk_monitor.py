import time
import random
from risk_assessment_ai import RiskAssessmentAI
from typing import Dict, Any

class RiskMonitor:
    def __init__(self, risk_assessment_ai: RiskAssessmentAI, check_interval: int = 60):
        self.risk_assessment_ai = risk_assessment_ai
        self.check_interval = check_interval
        self.alerts = []

    def simulate_data(self) -> Dict[str, Any]:
        """Simulate incoming data for risk assessment."""
        return {
            'feature1': random.uniform(0, 100),
            'feature2': random.uniform(0, 100),
            'feature3': random.uniform(0, 100),
            # Add more features as needed
        }

    def monitor_risks(self):
        """Continuously monitor risks and assess them."""
        while True:
            input_data = self.simulate_data()
            risk_level = self.risk_assessment_ai.assess_risk(input_data)

            if risk_level == "High":
                self.trigger_alert(input_data)

            time.sleep(self.check_interval)

    def trigger_alert(self, input_data: Dict[str, Any]):
        """Trigger an alert for high-risk assessment."""
        alert_message = f"High risk detected with data: {input_data}"
        self.alerts.append(alert_message)
        print(alert_message)

    def get_alerts(self):
        """Get all triggered alerts."""
        return self.alerts
