import React, { useState } from 'react';
import { createProposal } from '../services/api';

const ProposalForm = () => {
    const [description, setDescription] = useState('');
    const [funding, setFunding] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProposal({ description, funding });
        setDescription('');
        setFunding('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Proposal Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Funding Amount"
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                required
            />
            <button type="submit">Create Proposal</button>
        </form>
    );
};

export default ProposalForm;
