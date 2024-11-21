from compliance_framework import ComplianceFramework

class RegulatoryManager:
    def __init__(self, compliance_framework):
        self.compliance_framework = compliance_framework

    def process_transaction(self, transaction):
        if self.compliance_framework.check_compliance(transaction):
            print(f"Transaction {transaction} is compliant and processed.")
        else:
            print(f"Transaction {transaction} is not compliant and rejected.")
