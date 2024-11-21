import pytest
from crosschain.cross_chain_bridge import CrossChainBridge

def test_transfer(mocker):
    bridge = CrossChainBridge()
    mocker.patch.object(bridge, 'transfer')
    bridge.transfer("BTC", 0.5, "Ethereum")
    bridge.transfer.assert_called_once_with("BTC", 0.5, "Ethereum")
