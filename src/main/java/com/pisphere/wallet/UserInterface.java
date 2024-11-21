package com.pisphere.wallet;

import java.util.Scanner;

public class UserInterface {
    private WalletService walletService;

    public UserInterface(WalletService walletService) {
        this.walletService = walletService;
    }

    public void start() {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Welcome to the PiSphere Wallet!");
        // Additional UI logic
    }
}
