package com.pisphere.crosschain;

import org.junit.jupiter.api.Test;

public class CrossChainBridgeTest {
    @Test
    public void testTransfer() {
        CrossChainBridge bridge = new CrossChainBridge();
        bridge.transfer("BTC", 0.5, "Ethereum");
        // Verify that the transfer logic works as expected
    }
}
