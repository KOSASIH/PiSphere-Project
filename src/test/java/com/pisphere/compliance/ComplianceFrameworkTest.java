package com.pisphere.compliance;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class ComplianceFrameworkTest {
    @Test
    public void testCheckCompliance() {
        ComplianceFramework ```java
complianceFramework = new ComplianceFramework();
        boolean isCompliant = complianceFramework.checkCompliance("SampleTransaction");
        assertTrue(isCompliant);
    }
}
