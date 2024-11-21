from typing import Dict, List
from collections import defaultdict

class ComplianceFramework:
    def __init__(self):
        self.regulations = defaultdict(list)
        self.controls = {}

    def add_regulation(self, regulation_id: str, description: str):
        """Add a new regulation to the framework."""
        self.regulations[regulation_id].append(description)
        print(f"Added regulation {regulation_id}: {description}")

    def add_control(self, control_id: str, description: str, regulation_id: str):
        """Add a new control to the framework."""
        self.controls[control_id] = {
            'description': description,
            'regulation_id': regulation_id
        }
        print(f"Added control {control_id}: {description} for regulation {regulation_id}")

    def get_regulations(self) -> Dict[str, List[str]]:
        """Get all regulations in the framework."""
        return self.regulations

    def get_controls(self) -> Dict[str, Dict[str, str]]:
        """Get all controls in the framework."""
        return self.controls

    def get_controls_for_regulation(self, regulation_id: str) -> List[Dict[str, str]]:
        """Get controls associated with a specific regulation."""
        controls = []
        for control_id, control in self.controls.items():
            if control['regulation_id'] == regulation_id:
                controls.append(control)
        return controls
