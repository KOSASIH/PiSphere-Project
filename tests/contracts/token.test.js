const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token;
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("MyToken", "MTK", 1000);
        await token.deployed();
    });

    it("Should have the correct name and symbol", async function () {
        expect(await token.name()).to.equal("MyToken");
        expect(await token.symbol()).to.equal("MTK");
    });

    it("Should transfer tokens between accounts", async function () {
        await token.transfer(addr1.address, 100);
        expect(await token.balanceOf(addr1.address)).to.equal(100);
    });

    it("Should fail if sender does not have enough tokens", async function () {
        await expect(token.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not enough tokens");
    });
});
