package com.pisphere.governance;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GovernanceTokenTest {
    private GovernanceToken governanceToken;

    @BeforeEach
    public void setUp() {
        governanceToken = new GovernanceToken("PiGovernanceToken", 1000000.0);
    }

    @Test
    public void testMintTokens() {
        governanceToken.mintTokens(500.0);
        assertEquals(1000500.0, governanceToken.getTotalSupply());
    }
}
