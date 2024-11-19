import mongoose from 'mongoose';

const proposalSchema = new mongoose.Schema({
    description: { type: String, required: true },
    funding: { type: Number, required: true },
}, { timestamps: true });

const Proposal = mongoose.model('Proposal', proposalSchema);
export default Proposal;
