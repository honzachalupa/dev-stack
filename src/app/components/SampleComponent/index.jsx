import React, { Component, Fragment } from 'react';
import { AppContext } from './../../App';
import './style';

export default class SampleComponent extends Component {
    render() {
        return (
            <div>
                <p>Sample component.</p>

                <AppContext.Consumer>
                    {({ test, _updateContextProperty }) => {
                        return (
                            <Fragment>
                                <p>{test}</p>
                                <button onClick={() => _updateContextProperty('test', Math.random())}>Update app's context...</button>
                            </Fragment>
                        );
                    }}
                </AppContext.Consumer>
            </div>
        );
    }
}
