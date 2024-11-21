import pytest
from risk.risk_assessment_ai import RiskAssessmentAI

def test_assess_risk():
    risk_assessment_ai = RiskAssessmentAI()
    risk_score = risk_assessment_ai.assess_risk([0.1, 0.2, 0.3])
    assert risk_score >= 0.0 and risk_score <= 1.0
