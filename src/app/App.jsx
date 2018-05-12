/* eslint-disable react/no-unused-state */

import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import config from './../app-config';
import { _isValid } from './helpers';
import './App.scss';
import Page_Home from './pages/Home';
import Page_NotFound from './pages/NotFound';

export const AppContext = React.createContext();

class App extends Component {
    constructor() {
        super();

        this.updateContext = this.updateContext.bind(this);
        this.updateContextProperty = this.updateContextProperty.bind(this);

        this.state = {
            test: Math.random(),
            _updateContext: this.updateContext,
            _updateContextProperty: this.updateContextProperty
        };

        if (_isValid(config.caching)) {
            this.initServiceWorker();
        }
    }

    /**
     * Initialization of SW used for caching (PWA requirement).
     *
     * @memberof App
     */
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch((error) => {
                    console.log('SW registration failed: ', error);
                });
            });
        }
    }

    /**
     * Performs an update of the global (App-level) context. Old state will be replaced with the new one.
     *
     * @param {any} context
     * @memberof App
     */
    updateContext(context) {
        this.setState(context);
    }

    /**
     * Performs an update of the global (App-level) context. Updates only selected item.
     *
     * @param {any} key
     * @param {any} value
     * @memberof App
     */
    updateContextProperty(key, value) {
        this.setState({
            [key]: value
        });
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <Router history={browserHistory}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Page_Home />
                            )}
                        />
                        <Route
                            render={() => (
                                <Page_NotFound />
                            )}
                        />
                    </Switch>
                </Router>
            </AppContext.Provider>
        );
    }
}

render(<App />, document.querySelector('#app'));
