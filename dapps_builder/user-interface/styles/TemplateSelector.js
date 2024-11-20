// styles/TemplateSelector.js
import React, { useEffect, useState } from 'react';
import { fetchTemplates } from '../api/templates';

const TemplateSelector = ({ onSelect }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const templatesData = await fetchTemplates();
                setTemplates(templatesData);
            } catch (err) {
                setError('Failed to load templates');
            } finally {
                setLoading(false);
            }
        };
        loadTemplates();
    }, []);

    if (loading) {
        return <div>Loading templates...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Select a Template</h2>
            <ul className="template-list">
                {templates.map((template) => (
                    <li key={template.id} className="template-item" onClick={() => onSelect(template)}>
                        <h3>{template.name}</h3>
                        <p>{template.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TemplateSelector;
