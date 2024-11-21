from cross_chain_bridge import CrossChainBridge

class CrossChainManager:
    def __init__(self, bridge):
        self.bridge = bridge

    def initiate_transfer(self, asset, amount, target_chain):
        self.bridge.transfer(asset, amount, target_chain)
