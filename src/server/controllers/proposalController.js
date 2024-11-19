import Proposal from '../models/Proposal.js';

export const getProposals = async (req, res) => {
    const proposals = await Proposal.find();
    res.json(proposals);
};

export const createProposal = async (req, res) => {
    const { description, funding } = req.body;
    const newProposal = new Proposal({ description, funding });
    await newProposal.save();
    res.status(201).json(newProposal);
};
