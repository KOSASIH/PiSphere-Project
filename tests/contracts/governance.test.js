const DAO = artifacts.require("DAO");

contract("DAO", accounts => {
    let dao;

    before(async () => {
        dao = await DAO.new();
        await dao.initialize();
    });

    it("should create a proposal", async () => {
        await dao.createProposal("Proposal 1");
        const proposal = await dao.proposals(0);
        assert.equal(proposal.description, "Proposal 1");
    });

    it("should allow voting", async () => {
        await dao.vote(0, { from: accounts[1] });
        const proposal = await dao.proposals(0);
        assert.equal(proposal.voteCount.toString(), "1");
    });

    it("should not allow double voting", async () => {
        try {
            await dao.vote(0, { from: accounts[1] });
            assert.fail("Expected error not received");
        } catch (error) {
            assert(error.message.includes("Already voted."), "Error message should contain 'Already voted.'");
        }
    });
});
