// scripts/seed.js

const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    // Assuming the deployed contract addresses are known
    const governanceAddress = "0xYourGovernanceContractAddress";
    const tokenAddress = "0xYourTokenContractAddress";
    const marketplaceAddress = "0xYourMarketplaceContractAddress";

    const Governance = await ethers.getContractAt("Governance", governanceAddress);
    const Token = await ethers.getContractAt("Token", tokenAddress);
    const Marketplace = await ethers.getContractAt("Marketplace", marketplaceAddress);

    // Seed initial proposals
    await Governance.createProposal("Proposal 1");
    await Governance.createProposal("Proposal 2");

    console.log("Initial proposals created.");

    // Mint tokens to the deployer
    await Token.mint(deployer.address, ethers.utils.parseEther("1000"));
    console.log("Minted 1000 tokens to deployer.");

    // List an item in the marketplace
    await Marketplace.listItem("Item 1", ethers.utils.parseEther("1"));
    console.log("Listed Item 1 in the marketplace.");
}

// Execute the seeding script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
