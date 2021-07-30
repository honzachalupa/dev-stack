/* globals __BASENAME__ */

import '@babel/polyfill';
import { app, Context } from '@honzachalupa/helpers';
import config from 'config';
import { IContext } from 'Interfaces/Context';
import Page_Home from 'Pages/Home';
import Page_NotFound from 'Pages/NotFound';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export interface IState {
    testValue: string;
}

const App = () => {
    const [state, setState] = useState<IState>({
        testValue: 'I\'m a testValue and I live in the AppContext - let\'s update me...'
    });

    const setTestValue = (value: string) => {
        setState((prevState: IState) => ({
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
        <Context.Provider value={{ ...state, ...globalFunctions } as IContext}>
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
