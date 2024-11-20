// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import DAppForm from './components/DAppForm';
import DAppList from './components/DAppList';

const App = () => {
    return (
        <div>
            <h1>DApps Builder</h1>
            <DAppForm />
            <DAppList />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
