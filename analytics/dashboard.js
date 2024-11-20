// analytics/dashboard.js

import React, { useEffect, useState } from 'react';
import { fetchAnalyticsData } from './api';
import { setupWebSocket } from './socket';
import { Line } from 'react-chartjs-2';
import './dashboard.css'; // Optional: CSS for styling

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() => {
        const getData = async () => {
            try {
                const analyticsData = await fetchAnalyticsData();
                setData(analyticsData);
                setChartData({
                    labels: analyticsData.transactionTrends.map(item => item.date),
                    datasets: [
                        {
                            label: 'Transactions',
                            data: analyticsData.transactionTrends.map(item => item.count),
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true,
                        },
                    ],
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
        const socket = setupWebSocket((newData) => {
            setData(prevData => ({
                ...prevData,
                totalTransactions: newData.totalTransactions,
                totalRevenue: newData.totalRevenue,
            }));
        });

        return () => {
            socket.close();
        };
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="dashboard">
            <h1>Analytics Dashboard</h1>
            <div className="analytics-cards">
                <div className="card">
                    <h2>Total Users</h2>
                    <p>{data.totalUsers}</p>
                </div>
                <div className="card">
                    <h2>Total Transactions</h2>
                    <p>{data.totalTransactions}</p>
                </div>
                <div className="card">
                    <h2>Total Revenue</h2>
                    <p>${data.totalRevenue.toFixed(2)}</p>
                </div>
            </div>
            <div className="charts">
                <h2>Transaction Trends</h2>
                <Line data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
