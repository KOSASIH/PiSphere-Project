package com.pisphere.oracles;

public class PriceFeedService {
    private OracleNetwork oracleNetwork;

    public PriceFeedService(OracleNetwork oracleNetwork) {
        this.oracleNetwork = oracleNetwork;
    }

    public double fetchPrice(String asset) {
        return oracleNetwork.getPriceFeed(asset);
    }
}
