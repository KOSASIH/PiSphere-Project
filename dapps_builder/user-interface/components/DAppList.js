// components/DAppList.js
import React, { useEffect, useState } from 'react';
import { fetchDApps } from '../api/dapps';

const DAppList = () => {
    const [dapps, setDApps] = useState([]);

    useEffect(() => {
        const loadDApps = async () => {
            const dAppsData = await fetchDApps();
            setDApps(dAppsData);
        };
        loadDApps();
    }, []);

    return (
        <div>
            <h2>My DApps</h2>
            <ul>
                {dapps.map((dapp) => (
                    <li key={dapp.id}>
                        <h3>{dapp.name}</h3>
                        <p>{dapp.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DAppList;
