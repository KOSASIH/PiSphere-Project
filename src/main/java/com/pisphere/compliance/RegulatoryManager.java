package com.pisphere.compliance;

public class RegulatoryManager {
    private ComplianceFramework complianceFramework;

    public RegulatoryManager(ComplianceFramework complianceFramework) {
        this.complianceFramework = complianceFramework;
    }

    public void processTransaction(String transactionDetails) {
        complianceFramework.checkCompliance(transactionDetails);
        // Additional processing logic
    }
}
