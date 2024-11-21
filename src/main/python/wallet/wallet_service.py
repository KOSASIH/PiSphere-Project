class WalletService:
    def __init__(self):
        self.balances = {}

    def add_balance(self, user, amount):
        self.balances[user] = self.balances.get(user, 0.0) + amount
        print(f"Added {amount} to {user}'s wallet. New balance: {self.balances[user]}")

    def get_balance(self, user):
        return self.balances.get(user, 0.0)
