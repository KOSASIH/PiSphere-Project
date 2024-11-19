import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Proposals from './pages/Proposals';
import Staking from './pages/Staking';

const App = () => {
    return (
        <Router>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/proposals" component={Proposals} />
                <Route path="/staking" component={Staking} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default App;
