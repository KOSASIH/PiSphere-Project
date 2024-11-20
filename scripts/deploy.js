// scripts/deploy.js

const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Governance Contract
    const Governance = await ethers.getContractFactory("Governance");
    const governance = await upgrades.deployProxy(Governance, { initializer: 'initialize' });
    await governance.deployed();
    console.log("Governance Contract deployed to:", governance.address);

    // Deploy Token Contract
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("MyToken", "MTK", ethers.utils.parseEther("1000000"));
    await token.deployed();
    console.log("Token Contract deployed to:", token.address);

    // Deploy Marketplace Contract
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();
    console.log("Marketplace Contract deployed to:", marketplace.address);
}

// Execute the deployment script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
