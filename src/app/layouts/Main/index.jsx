import React, { Component } from 'react';

export default class Layout_Main extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
