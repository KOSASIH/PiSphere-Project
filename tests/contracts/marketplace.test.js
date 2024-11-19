const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Marketplace Contract", function () {
    let Marketplace;
    let marketplace;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        Marketplace = await ethers.getContractFactory("Marketplace");
        marketplace = await Marketplace.deploy();
        await marketplace.deployed();
    });

    it("Should allow listing an item", async function () {
        await marketplace.listItem("Item 1", ethers.utils.parseEther("1"));
        const item = await marketplace.items(0);
        expect(item.name).to.equal("Item 1");
        expect(item.price.toString()).to.equal(ethers.utils.parseEther("1").toString());
    });

    it("Should allow purchasing an item", async function () {
        await marketplace.listItem("Item 1", ethers.utils.parseEther("1"));
        await marketplace.connect(addr1).purchaseItem(0, { value: ethers.utils.parseEther("1") });
        const item = await marketplace.items(0);
        expect(item.sold).to.be.true;
    });

    it("Should not allow purchasing an item with insufficient funds", async function () {
        await marketplace.listItem("Item 1", ethers.utils.parseEther("1"));
        await expect(marketplace.connect(addr1).purchaseItem(0, { value: ethers.utils.parseEther("0.5") })).to.be.revertedWith("Insufficient funds");
    });
});
