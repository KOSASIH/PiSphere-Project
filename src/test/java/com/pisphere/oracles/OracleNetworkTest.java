package com.pisphere.oracles;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class OracleNetworkTest {
    private OracleNetwork oracleNetwork;

    @BeforeEach
    public void setUp() {
        oracleNetwork = new OracleNetwork();
    }

    @Test
    public void testUpdateAndFetchPriceFeed() {
        oracleNetwork.updatePriceFeed("BTC", 50000.0);
        assertEquals(50000.0, oracleNetwork.getPriceFeed("BTC"));
    }
}
