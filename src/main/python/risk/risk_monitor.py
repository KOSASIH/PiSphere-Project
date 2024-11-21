from risk_assessment_ai import RiskAssessmentAI

class RiskMonitor:
    def __init__(self, risk_assessment_ai):
        self.risk_assessment_ai = risk_assessment_ai

    def monitor(self, data):
        risk_score = self.risk_assessment_ai.assess_risk(data)
        if risk_score > 0.7:
            print("High risk detected!")
