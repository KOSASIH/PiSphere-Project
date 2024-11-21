from oracle_network import OracleNetwork

class PriceFeedService:
    def __init__(self, oracle_network):
        self.oracle_network = oracle_network

    def fetch_price(self, asset):
        return self.oracle_network.get_price_feed(asset)
