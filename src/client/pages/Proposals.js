import React, { useEffect, useState } from 'react';
import ProposalForm from '../components/ProposalForm';
import { fetchProposals } from '../services/api';

const Proposals = () => {
    const [proposals, setProposals] = useState([]);

    useEffect(() => {
        const getProposals = async () => {
            const data = await fetchProposals();
            setProposals(data);
        };
        getProposals();
    }, []);

    return (
        <div>
            <h1>Proposals</h1>
            <ProposalForm />
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>{proposal.description} - Funding: {proposal.funding}</li>
                ))}
            </ul>
        </div>
    );
};

export default Proposals;
