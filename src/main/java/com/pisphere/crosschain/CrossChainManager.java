package com.pisphere.crosschain;

public class CrossChainManager {
    private CrossChainBridge bridge;

    public CrossChainManager(CrossChainBridge bridge) {
        this.bridge = bridge;
    }

    public void initiateTransfer(String asset, double amount, String targetChain) {
        bridge.transfer(asset, amount, targetChain);
    }
}
