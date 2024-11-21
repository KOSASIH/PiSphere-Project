from typing import Dict, Any
from collections import defaultdict

class GovernanceToken:
    def __init__(self):
        self.total_supply = 0
        self.balances = defaultdict(float)
        self.allowances = defaultdict(lambda: defaultdict(float))

    def mint(self, recipient: str, amount: float):
        """Mint new tokens to a recipient."""
        self.balances[recipient] += amount
        self.total_supply += amount
        print(f"Minted {amount} tokens to {recipient}. Total supply: {self.total_supply}")

    def transfer(self, sender: str, recipient: str, amount: float):
        """Transfer tokens from sender to recipient."""
        if self.balances[sender] < amount:
            raise ValueError("Insufficient balance.")
        self.balances[sender] -= amount
        self.balances[recipient] += amount
        print(f"Transferred {amount} tokens from {sender} to {recipient}.")

    def approve(self, owner: str, spender: str, amount: float):
        """Approve a spender to spend tokens on behalf of the owner."""
        self.allowances[owner][spender] = amount
        print(f"Approved {spender} to spend {amount} tokens on behalf of {owner}.")

    def transfer_from(self, owner: str, recipient: str, amount: float, spender: str):
        """Transfer tokens from owner to recipient using the spender's allowance."""
        if self.allowances[owner][spender] < amount:
            raise ValueError("Allowance exceeded.")
        if self.balances[owner] < amount:
            raise ValueError("Insufficient balance.")
        
        self.allowances[owner][spender] -= amount
        self.balances[owner] -= amount
        self.balances[recipient] += amount
        print(f"{spender} transferred {amount} tokens from {owner} to {recipient}.")

    def get_balance(self, address: str) -> float:
        """Get the balance of a specific address."""
        return self.balances[address]

    def get_total_supply(self) -> float:
        """Get the total supply of tokens."""
        return self.total_supply
