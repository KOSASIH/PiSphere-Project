package com.pisphere.stability;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DynamicStabilityMechanismTest {
    private DynamicStabilityMechanism stabilityMechanism;

    @BeforeEach
    public void setUp() {
        stabilityMechanism = new DynamicStabilityMechanism(1000000.0);
    }

    @Test
    public void testInitialSupply() {
        assertEquals(1000000.0, stabilityMechanism.getCurrentSupply());
    }

    // Additional tests for adjustSupply can be added here
}
