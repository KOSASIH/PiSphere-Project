package com.pisphere.risk;

public class RiskMonitor {
    private RiskAssessmentAI riskAssessmentAI;

    public RiskMonitor(RiskAssessmentAI riskAssessmentAI) {
        this.riskAssessmentAI = riskAssessmentAI;
    }

    public void monitorRisk(String asset) {
        double riskScore = riskAssessmentAI.assessRisk(asset);
        // Additional monitoring logic
    }
}
