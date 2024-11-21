from dynamic_stability import DynamicStabilityMechanism

class StabilityMonitor:
    def __init__(self, stability_mechanism):
        self.stability_mechanism = stability_mechanism

    def report_status(self):
        print(f"Current Supply: {self.stability_mechanism.get_current_supply()}")
        # Additional reporting logic
