package com.pisphere.wallet;

public class WalletService {
    public void createWallet(String userId) {
        // Logic to create a new wallet for the user
        System.out.println("Wallet created for user: " + userId);
    }

    public void transferFunds(String fromUserId, String toUserId, double amount) {
        // Logic to transfer funds between wallets
        System.out.println("Transferring " + amount + " from " + fromUserId + " to " + toUserId);
    }
}
