from cross_chain_bridge import CrossChainBridge

class CrossChainManager:
    def __init__(self):
        self.bridge = CrossChainBridge()

    def register_network(self, network_id: str, network_details: Dict[str, Any]):
        """Register a new blockchain network with the bridge."""
        self.bridge.register_network(network_id, network_details)

    def initiate_transfer(self, from_network: str, to_network: str, asset: str, amount: float, user_address: str) -> str:
        """Initiate a cross-chain transfer."""
        return self.bridge.initiate_transfer(from_network, to_network, asset, amount, user_address)

    def complete_transfer(self, transfer_id: str):
        """Complete a cross-chain transfer."""
        self.bridge.complete_transfer(transfer_id)

    def get_transfer_status(self, transfer_id: str) -> Dict[str, Any]:
        """Get the status of a transfer."""
        return self.bridge.get_transfer_status(transfer_id)

    def get_all_transfers(self) -> Dict[str, Any]:
        """Get all transfers (pending and completed)."""
        return self.bridge.get_all_transfers()
