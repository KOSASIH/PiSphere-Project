const DAO = artifacts.require("DAO");
const MultiSigWallet = artifacts.require("MultiSigWallet");

module.exports = async function (deployer) {
    await deployer.deploy(MultiSigWallet, [/* array of owner addresses */], 2); // 2 of 3 signers required
    await deployer.deploy(DAO);
    console.log("Multi-Signature Wallet deployed!");
    console.log("DAO contract deployed!");
};
