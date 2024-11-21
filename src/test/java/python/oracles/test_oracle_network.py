import pytest
from oracles.oracle_network import OracleNetwork

def test_update_and_fetch_price_feed():
    oracle_network = OracleNetwork()
    oracle_network.update_price_feed("BTC", 50000.0)
    assert oracle_network.get_price_feed("BTC") == 50000.0
