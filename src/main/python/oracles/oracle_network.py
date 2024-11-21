class OracleNetwork:
    def __init__(self):
        self.price_feeds = {}

    def update_price_feed(self, asset, price):
        self.price_feeds[asset] = price
        print(f"Updated price feed for {asset}: {price}")

    def get_price_feed(self, asset):
        return self.price_feeds.get(asset, 0.0)
