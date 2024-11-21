import pytest
from compliance.compliance_framework import ComplianceFramework

def test_check_compliance():
    compliance_framework = ComplianceFramework()
    is_compliant = compliance_framework.check_compliance("SampleTransaction")
    assert is_compliant
