// contracts/stakingRewards.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingRewards is Ownable {
    IERC20 public piCoin;
    uint256 public rewardRate; // Reward rate per block
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public lastStakedBlock;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);

    constructor(address _piCoin, uint256 _rewardRate) {
        piCoin = IERC20(_piCoin);
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        piCoin.transferFrom(msg.sender, address(this), amount);
        stakedAmount[msg.sender] += amount;
        lastStakedBlock[msg.sender] = block.number;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(stakedAmount[msg.sender] >= amount, "Insufficient staked amount");
        updateReward(msg.sender);
        stakedAmount[msg.sender] -= amount;
        piCoin.transfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function updateReward(address user) ```solidity
    internal {
        uint256 blocksStaked = block.number - lastStakedBlock[user];
        rewards[user] += blocksStaked * rewardRate * stakedAmount[user];
        lastStakedBlock[user] = block.number;
    }

    function claimReward() external {
        updateReward(msg.sender);
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "No rewards to claim");
        rewards[msg.sender] = 0;
        piCoin.transfer(msg.sender, reward);
        emit RewardPaid(msg.sender, reward);
    }

    function getStakedAmount(address user) external view returns (uint256) {
        return stakedAmount[user];
    }

    function getReward(address user) external view returns (uint256) {
        uint256 blocksStaked = block.number - lastStakedBlock[user];
        return rewards[user] + (blocksStaked * rewardRate * stakedAmount[user]);
    }
}
