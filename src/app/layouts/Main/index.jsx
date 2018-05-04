import React, { Component } from 'react';

export default class Layout_Main extends Component {
    render() {
        return (
            <div data-component={this.constructor.name}>
                {this.props.children}
            </div>
        );
    }
}
