const API_URL = 'http://localhost:5000/api';

export const fetchProposals = async () => {
    const response = await fetch(`${API_URL}/proposals`);
    return await response.json();
};

export const createProposal = async (proposal) => {
    await fetch(`${API_URL}/proposals`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposal),
    });
};
