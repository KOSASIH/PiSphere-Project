// contracts/insuranceFund.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InsuranceFund is Ownable {
    IERC20 public piCoin;
    uint256 public insurancePool;

    event InsuranceClaimed(address indexed claimant, uint256 amount);
    event InsuranceFunded(uint256 amount);

    constructor(address _piCoin) {
        piCoin = IERC20(_piCoin);
    }

    function fundInsurance(uint256 amount) external onlyOwner {
        piCoin.transferFrom(msg.sender, address(this), amount);
        insurancePool += amount;
        emit InsuranceFunded(amount);
    }

    function claimInsurance(uint256 amount) external {
        require(amount <= insurancePool, "Insufficient insurance pool");
        insurancePool -= amount;
        piCoin.transfer(msg.sender, amount);
        emit InsuranceClaimed(msg.sender, amount);
    }

    function getInsurancePool() external view returns (uint256) {
        return insurancePool;
    }
}
