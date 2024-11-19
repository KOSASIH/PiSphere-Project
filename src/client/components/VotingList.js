import React, { useEffect, useState } from 'react';
import { fetchProposals, voteOnProposal } from '../services/api';
import './components.css';

const VotingList = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getProposals = async () => {
            try {
                const data = await fetchProposals();
                setProposals(data);
            } catch (err) {
                setError('Failed to fetch proposals');
            } finally {
                setLoading(false);
            }
        };

        getProposals();
    }, []);

    const handleVote = async (proposalId) => {
        try {
            await voteOnProposal(proposalId);
            // Optionally, you can update the local state to reflect the vote
            setProposals((prevProposals) =>
                prevProposals.map((proposal) =>
                    proposal.id === proposalId ? { ...proposal, votes: proposal.votes + 1 } : proposal
                )
            );
        } catch (err) {
            setError('Failed to cast vote');
        }
    };

    if (loading) {
        return <div>Loading proposals...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="voting-list">
            <h2>Voting List</h2>
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id} className="proposal-item">
                        <h3>{proposal.description}</h3>
                        <p>Funding Amount: {proposal.funding}</p>
                        <p>Votes: {proposal.votes}</p>
                        <button onClick={() => handleVote(proposal.id)}>Vote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VotingList;
