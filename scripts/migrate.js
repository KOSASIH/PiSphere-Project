// scripts/migrate.js

const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Migrating contracts with the account:", deployer.address);

    // Upgrade Governance Contract
    const GovernanceV2 = await ethers.getContractFactory("GovernanceV2");
    const governanceAddress = "0xYourGovernanceContractAddress";
    const upgradedGovernance = await upgrades.upgradeProxy(governanceAddress, GovernanceV2);
    await upgradedGovernance.deployed();
    console.log("Governance Contract upgraded to:", upgradedGovernance.address);

    // Additional migration logic can be added here
}

// Execute the migration script
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
