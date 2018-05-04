import React, { Component } from 'react';
import './style';

export default class SampleComponent extends Component {
    render() {
        return (
            <div data-component={this.constructor.name}>
                <p>Sample component.</p>
            </div>
        );
    }
}
