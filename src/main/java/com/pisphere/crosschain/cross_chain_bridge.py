import json
import hashlib
import time
from typing import Dict, Any, List

class CrossChainBridge:
    def __init__(self):
        self.pending_transfers = {}
        self.completed_transfers = {}
        self.networks = {}

    def register_network(self, network_id: str, network_details: Dict[str, Any]):
        """Register a new blockchain network."""
        self.networks[network_id] = network_details
        print(f"Network {network_id} registered.")

    def initiate_transfer(self, from_network: str, to_network: str, asset: str, amount: float, user_address: str) -> str:
        """Initiate a cross-chain transfer."""
        if from_network not in self.networks or to_network not in self.networks:
            raise ValueError("Invalid network specified.")

        transfer_id = self._generate_transfer_id(user_address, asset, amount)
        self.pending_transfers[transfer_id] = {
            'from_network': from_network,
            'to_network': to_network,
            'asset': asset,
            'amount': amount,
            'user_address': user_address,
            'timestamp': time.time()
        }
        print(f"Transfer initiated: {transfer_id}")
        return transfer_id

    def _generate_transfer_id(self, user_address: str, asset: str, amount: float) -> str:
        """Generate a unique transfer ID."""
        data = f"{user_address}-{asset}-{amount}-{time.time()}"
        return hashlib.sha256(data.encode()).hexdigest()

    def complete_transfer(self, transfer_id: str):
        """Complete a cross-chain transfer."""
        if transfer_id not in self.pending_transfers:
            raise ValueError("Transfer ID not found.")

        transfer_details = self.pending_transfers.pop(transfer_id)
        self.completed_transfers[transfer_id] = transfer_details
        print(f"Transfer completed: {transfer_id}")

    def get_transfer_status(self, transfer_id: str) -> Dict[str, Any]:
        """Get the status of a transfer."""
        if transfer_id in self.pending_transfers:
            return {'status': 'pending', 'details': self.pending_transfers[transfer_id]}
        elif transfer_id in self.completed_transfers:
            return {'status': 'completed', 'details': self.completed_transfers[transfer_id]}
        else:
            return {'status': 'not found'}

    def get_all_transfers(self) -> List[Dict[str, Any]]:
        """Get all transfers (pending and completed)."""
        return {
            'pending': self.pending_transfers,
            'completed': self.completed_transfers
        }
