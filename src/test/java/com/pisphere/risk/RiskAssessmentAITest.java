package com.pisphere.risk;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class RiskAssessmentAITest {
    private RiskAssessmentAI riskAssessmentAI;

    @BeforeEach
    public void setUp() {
        riskAssessmentAI = new RiskAssessmentAI();
    }

    @Test
    public void testAssessRisk() {
        double riskScore = riskAssessmentAI.assessRisk(new double[]{0.1, 0.2, 0.3});
        assertTrue(riskScore >= 0.0 && riskScore <= 1.0);
    }
}
