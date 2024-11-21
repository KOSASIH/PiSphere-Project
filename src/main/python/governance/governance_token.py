class GovernanceToken:
    def __init__(self, token_name, total_supply):
        self.token_name = token_name
        self.total_supply = total_supply

    def mint_tokens(self, amount):
        self.total_supply += amount
        print(f"Minted {amount} tokens. Total supply: {self.total_supply}")

    def get_total_supply(self):
        return self.total_supply
