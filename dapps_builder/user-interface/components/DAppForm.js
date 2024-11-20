// components/DAppForm.js
import React, { useState } from 'react';
import { createDApp } from '../api/dapps';

const DAppForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [template, setTemplate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDApp = { name, description, template };
        await createDApp(newDApp);
        // Reset form
        setName('');
        setDescription('');
        setTemplate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New DApp</h2>
            <input
                type="text"
                placeholder="DApp Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="DApp Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <select value={template} onChange={(e) => setTemplate(e.target.value)} required>
                <option value="">Select Template</option>
                <option value="template1">Marketplace Template</option>
                <option value="template2">Social DApp Template</option>
            </select>
            <button type="submit">Create DApp</button>
        </form>
    );
};

export default DAppForm;
