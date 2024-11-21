import json
import uuid
from typing import Dict, Any, List
from collections import defaultdict

class WalletService:
    def __init__(self):
        self.wallets = {}
        self.transaction_history = defaultdict(list)

    def create_wallet(self, user_id: str) -> str:
        """Create a new wallet for a user."""
        wallet_id = str(uuid.uuid4())
        self.wallets[wallet_id] = {
            'user_id': user_id,
            'balances': defaultdict(float)
        }
        print(f"Wallet created for user {user_id}: {wallet_id}")
        return wallet_id

    def deposit(self, wallet_id: str, currency: str, amount: float):
        """Deposit an amount into the wallet."""
        if wallet_id not in self.wallets:
            raise ValueError("Wallet not found.")
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")

        self.wallets[wallet_id]['balances'][currency] += amount
        self.transaction_history[wallet_id].append({
            'type': 'deposit',
            'currency': currency,
            'amount': amount
        })
        print(f"Deposited {amount} {currency} to wallet {wallet_id}.")

    def withdraw(self, wallet_id: str, currency: str, amount: float):
        """Withdraw an amount from the wallet."""
        if wallet_id not in self.wallets:
            raise ValueError("Wallet not found.")
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if self.wallets[wallet_id]['balances'][currency] < amount:
            raise ValueError("Insufficient balance.")

        self.wallets[wallet_id]['balances'][currency] -= amount
        self.transaction_history[wallet_id].append({
            'type': 'withdrawal',
            'currency': currency,
            'amount': amount
        })
        print(f"Withdrew {amount} {currency} from wallet {wallet_id}.")

    def get_balance(self, wallet_id: str) -> Dict[str, float]:
        """Get the balance of the wallet."""
        if wallet_id not in self.wallets:
            raise ValueError("Wallet not found.")
        return self.wallets[wallet_id]['balances']

    def get_transaction_history(self, wallet_id: str) -> List[Dict[str, Any]]:
        """Get the transaction history of the wallet."""
        if wallet_id not in self.wallets:
            raise ValueError("Wallet not found.")
        return self.transaction_history[wallet_id]

    def get_wallet_info(self, wallet_id: str) -> Dict[str, Any]:
        """Get wallet information including balance and transaction history."""
        if wallet_id not in self.wallets:
            raise ValueError("Wallet not found.")
        return {
            'balances': self.wallets[wallet_id]['balances'],
            'transaction_history': self.transaction_history[wallet_id]
        }
