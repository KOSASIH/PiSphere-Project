class UserInterface:
    def display_balance(self, user, balance):
        print(f"{user}'s balance: {balance}")

    def prompt_user(self, message):
        return input(message)
