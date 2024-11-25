// tests/contracts.test.js
const { ethers } = require('hardhat');

describe('PiCoin Smart Contract', () => {
    let piCoin;

    beforeEach(async () => {
        const PiCoin = await ethers.getContractFactory('PiCoin');
        piCoin = await PiCoin.deploy();
        await piCoin.deployed();
    });

    it('should have a total supply of 1 million tokens', async () => {
        const totalSupply = await piCoin.totalSupply();
        expect(totalSupply.toString()).toBe('1000000');
    });

    it('should allow users to transfer tokens', async () => {
        const [owner, addr1] = await ethers.getSigners();
        await piCoin.transfer(addr1.address, 100);
        const addr1Balance = await piCoin.balanceOf(addr1.address);
        expect(addr1Balance.toString()).toBe('100');
    });

    it('should not allow transfer of more tokens than available', async () => {
        const [owner, addr1] = await ethers.getSigners();
        await expect(piCoin.connect(addr1).transfer(owner.address, 100)).to.be.revertedWith('Insufficient balance');
    });
});
