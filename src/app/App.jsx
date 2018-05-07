import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';
import config from './../app-config';
import { _isValid } from './helpers';
import './App.scss';
import Page_Home from './pages/Home';
import Page_NotFound from './pages/NotFound';

class App extends Component {
    constructor() {
        super();

        if (_isValid(config.caching)) {
            this.initServiceWorker();
        }
    }

    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch((error) => {
                    console.log('SW registration failed: ', error);
                });
            });
        }
    }

    render() {
        return (
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
        );
    }
}

render(<App />, document.querySelector('body'));
