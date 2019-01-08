import '@babel/polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import config from 'app-config';
import AppContext from 'Helpers/context';
import { _initServiceWorker } from 'Helpers/app';
import './App.scss';
import Page_Home from 'Pages/Home';
import Page_NotFound from 'Pages/NotFound';

class App extends Component {
    constructor() {
        super();

        this.updateContextProperty = this.updateContextProperty.bind(this);

        this.state = {
            test: Math.random(),
            _updateContext: this.updateContext,
            _updateContextProperty: this.updateContextProperty
        };

        if (config.caching && config.caching.strategy) {
            _initServiceWorker();
        }
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
                <Router>
                    <Switch>
                        <Route component={Page_Home} path="/" exact />
                        <Route component={Page_NotFound} exact />
                    </Switch>
                </Router>
            </AppContext.Provider>
        );
    }
}

render(<App />, document.querySelector('#app'));
