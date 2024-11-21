from automated_market_maker import AutomatedMarketMaker

class LiquidityPoolManager:
    def __init__(self, pools: List[Dict[str, float]]):
        self.pools = [AutomatedMarketMaker(pool, 0.01) for pool in pools]

    def add_liquidity(self, asset: str, quantity: float) -> None:
        # Add liquidity to the corresponding pool
        for pool in self.pools:
            if asset in pool.get_inventory():
                pool.execute_trade(asset, quantity)
                break

    def remove_liquidity(self, asset: str, quantity: float) -> None:
        # Remove liquidity from the corresponding pool
        for pool in self.pools:
            if asset in pool.get_inventory():
                pool.execute_trade(asset, -quantity)
                break

    def get_price(self, asset: str) -> float:
        # Return the current price for a given asset
        for pool in self.pools:
            if asset in pool.get_inventory():
                return pool.get_price(asset)
        return None

    def get_inventory(self) -> Dict[str, float]:
        # Return the current inventory across all pools
        inventory = {}
        for pool in self.pools:
            inventory.update(pool.get_inventory())
        return inventory
