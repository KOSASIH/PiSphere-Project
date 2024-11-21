package com.pisphere.market;

import java.util.HashMap;
import java.util.Map;

public class LiquidityPoolManager {
    private Map<String, Double> liquidityPools;

    public LiquidityPoolManager() {
        liquidityPools = new HashMap<>();
    }

    public void addLiquidity(String asset, double amount) {
        liquidityPools.put(asset, liquidityPools.getOrDefault(asset, 0.0) + amount);
        System.out.println("Added liquidity for " + asset + ": " + amount);
    }

    public double getLiquidity(String asset) {
        return liquidityPools.getOrDefault(asset, 0.0);
    }
}
