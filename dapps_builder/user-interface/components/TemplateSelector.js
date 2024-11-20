// components/TemplateSelector.js
import React from 'react';

const TemplateSelector = ({ templates, onSelect }) => {
    return (
        <div>
            <h2>Select a Template</h2>
            <ul>
                {templates.map((template) => (
                    <li key={template.id} onClick={() => onSelect(template)}>
                        {template.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TemplateSelector;
