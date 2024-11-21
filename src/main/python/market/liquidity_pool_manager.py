class LiquidityPoolManager:
    def __init__(self):
        self.liquidity_pools = {}

    def add_liquidity(self, asset, amount):
        self.liquidity_pools[asset] = self.liquidity_pools.get(asset, 0.0) + amount
        print(f"Added liquidity for {asset}: {amount}")

    def get_liquidity(self, asset):
        return self.liquidity_pools.get(asset, 0.0)
