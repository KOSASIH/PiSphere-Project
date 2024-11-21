package com.pisphere.stability;

public class StabilityMonitor {
    private DynamicStabilityMechanism stabilityMechanism;

    public StabilityMonitor(DynamicStabilityMechanism stabilityMechanism) {
        this.stabilityMechanism = stabilityMechanism;
    }

    public void reportStatus() {
        System.out.println("Current Supply: " + stabilityMechanism.getCurrentSupply());
        // Additional reporting logic
    }
}
