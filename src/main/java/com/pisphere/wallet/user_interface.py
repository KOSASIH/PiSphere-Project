from wallet_service import WalletService

class UserInterface:
    def __init__(self):
        self.wallet_service = WalletService()

    def main_menu(self):
        """Display the main menu and handle user input."""
        while True:
            print("\n--- Wallet Service ---")
            print("1. Create Wallet")
            print("2. Deposit")
            print("3. Withdraw")
            print("4. Check Balance")
            print("5. Transaction History")
            print("6. Exit")

            choice = input("Select an option: ")

            if choice == '1':
                user_id = input("Enter your user ID: ")
                wallet_id = self.wallet_service.create_wallet(user_id)
                print(f"Your wallet ID is: {wallet_id}")

            elif choice == '2':
                wallet_id = input("Enter your wallet ID: ")
                currency = input("Enter currency (e.g., BTC, ETH): ")
                amount = float(input("Enter amount to deposit: "))
                self.wallet_service.deposit(wallet_id, currency, amount)

            elif choice == '3':
                wallet_id = input("Enter your wallet ID: ")
                currency = input("Enter currency (e.g., BTC, ETH): ")
                amount = float(input("Enter amount to withdraw: "))
                self.wallet_service.withdraw(wallet_id, currency, amount)

            elif choice == '4':
                wallet_id = input("Enter your wallet ID: ")
                balance = self.wallet_service .get_balance(wallet_id)
                print(f"Balance for wallet {wallet_id}: {balance}")

            elif choice == '5':
                wallet_id = input("Enter your wallet ID: ")
                history = self.wallet_service.get_transaction_history(wallet_id)
                print(f"Transaction history for wallet {wallet_id}:")
                for transaction in history:
                    print(transaction)

            elif choice == '6':
                print("Exiting the wallet service.")
                break

            else:
                print("Invalid option. Please try again.")

