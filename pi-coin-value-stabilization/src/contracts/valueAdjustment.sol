// contracts/valueAdjustment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ValueAdjustment is Ownable {
    IERC20 public piCoin;
    uint256 public targetPrice; // Target price in wei (e.g., 314.159 * 10^18 for 18 decimals)
    uint256 public adjustmentFactor; // Adjustment factor in basis points (e.g., 500 for 5%)

    event SupplyAdjusted(uint256 newSupply);

    constructor(address _piCoin, uint256 _targetPrice, uint256 _adjustmentFactor) {
        piCoin = IERC20(_piCoin);
        targetPrice = _targetPrice;
        adjustmentFactor = _adjustmentFactor;
    }

    function adjustSupply(uint256 currentPrice, uint256 currentSupply) external onlyOwner {
        uint256 newSupply;
        if (currentPrice < targetPrice) {
            newSupply = currentSupply + (currentSupply * adjustmentFactor / 10000);
        } else if (currentPrice > targetPrice) {
            newSupply = currentSupply - (currentSupply * adjustmentFactor / 10000);
        } else {
            newSupply = currentSupply;
        }
        emit SupplyAdjusted(newSupply);
        // Logic to update the supply on-chain
    }
}
