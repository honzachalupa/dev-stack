import React, { Component } from 'react';
import './style';

export default class Layout_Main extends Component {
    render() {
        const { children: content } = this.props;

        return (
            <div>
                {content}
            </div>
        );
    }
}
