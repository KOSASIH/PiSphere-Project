package com.pisphere.oracles;

import java.util.HashMap;
import java.util.Map;

public class OracleNetwork {
    private Map<String, Double> priceFeeds;

    public OracleNetwork() {
        priceFeeds = new HashMap<>();
    }

    public void updatePriceFeed(String asset, double price) {
        priceFeeds.put(asset, price);
        System.out.println("Updated price feed for " + asset + ": " + price);
    }

    public double getPriceFeed(String asset) {
        return priceFeeds.getOrDefault(asset, 0.0);
    }
}
