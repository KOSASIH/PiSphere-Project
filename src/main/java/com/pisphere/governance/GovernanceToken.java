package com.pisphere.governance;

public class GovernanceToken {
    private String tokenName;
    private double totalSupply;

    public GovernanceToken(String tokenName, double totalSupply) {
        this.tokenName = tokenName;
        this.totalSupply = totalSupply;
    }

    public void mintTokens(double amount) {
        totalSupply += amount;
        System.out.println("Minted " + amount + " tokens. Total supply: " + totalSupply);
    }

    public double getTotalSupply() {
        return totalSupply;
    }
}
