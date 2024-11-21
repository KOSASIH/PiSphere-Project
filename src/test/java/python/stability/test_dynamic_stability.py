import pytest
from stability.dynamic_stability import DynamicStabilityMechanism

def test_initial_supply():
    stability_mechanism = DynamicStabilityMechanism(1000000.0)
    assert stability_mechanism.get_current_supply() == 1000000.0

# Additional tests for adjust_supply can be added here
