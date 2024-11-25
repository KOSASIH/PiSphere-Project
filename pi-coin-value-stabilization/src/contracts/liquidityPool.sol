// src/contracts/liquidityPool.sol
pragma solidity ^0.8.0;

contract LiquidityPool {
    mapping(address => uint256) public liquidityProviders;

    function addLiquidity() public payable {
        liquidityProviders[msg.sender] += msg.value;
    }

    function removeLiquidity(uint256 amount) public {
        require(liquidityProviders[msg.sender] >= amount, "Insufficient liquidity");
        liquidityProviders[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getLiquidity(address provider) public view returns (uint256) {
        return liquidityProviders[provider];
    }
}
