// scripts/deployContracts.js
const { ethers } = require('hardhat');

async function main() {
    const PiCoin = await ethers.getContractFactory('PiCoin');
    const piCoin = await PiCoin.deploy();
    await piCoin.deployed();
    console.log(`PiCoin deployed to: ${piCoin.address}`);

    const Governance = await ethers.getContractFactory('Governance');
    const governance = await Governance.deploy(piCoin.address);
    await governance.deployed();
    console.log(`Governance contract deployed to: ${governance.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
