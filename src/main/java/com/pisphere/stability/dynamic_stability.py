class DynamicStabilityMechanism:
    TARGET_PRICE = 314.159

    def __init__(self, adjustment_factor):
        self.current_price = 0
        self.adjustment_factor = adjustment_factor
        self.market_data = {}

    def update_market_data(self, asset, price):
        self.market_data[asset] = price
        self.adjust_stability()

    def adjust_stability(self):
        self.current_price = sum(self.market_data.values()) / len(self.market_data)

        if self.current_price > self.TARGET_PRICE:
            print("Current price is above target. Adjusting supply.")
            self.adjust_supply()
        elif self.current_price < self.TARGET_PRICE:
            print("Current price is below target. Adjusting demand.")
            self.adjust_demand()

    def adjust_supply(self):
        print("Increasing supply to stabilize price.")

    def adjust_demand(self):
        print("Decreasing supply to stabilize price.")

    def get_current_price(self):
        return self.current_price
