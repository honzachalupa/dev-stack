/* globals __BASENAME__ */

import '@babel/polyfill';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from 'app-config';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_NotFound from 'Pages/NotFound';
import { Context, app } from '@honzachalupa/helpers';

const App = () => {
    const [state, setState] = useState({
        testValue: 'I\'m a testValue and I live in the AppContext - let\'s update me...'
    });

    const setTestValue = value => {
        setState(prevState => ({
            ...prevState,
            testValue: value
        }));
    };

    useEffect(() => {
        if (config.caching) {
            app.initServiceWorker();
        }
    }, []);

    const globalFunctions = {
        setTestValue
    };

    return (
        <Context.Provider value={{ ...state, ...globalFunctions }}>
            <Router basename={__BASENAME__}>
                <Switch>
                    <Route component={Page_Home} path="/" exact />
                    <Route component={Page_NotFound} exact />
                </Switch>
            </Router>
        </Context.Provider>
    );
};

render(<App />, document.querySelector('#app'));
