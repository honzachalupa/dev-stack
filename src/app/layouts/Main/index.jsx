import React, { Component } from 'react';
import './style';

export default class Layout_Main extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
