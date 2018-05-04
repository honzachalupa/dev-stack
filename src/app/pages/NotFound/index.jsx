import React, { Component } from 'react';
import Layout_Main from './../../layouts/Main';

export default class Page_NotFound extends Component {
    constructor() {
        super();

        this.state = {
            page: {
                label: 'Not Found'
            }
        };
    }

    render() {
        return (
            <section data-component={this.constructor.name}>
                <Layout_Main page={this.state.page}>
                    <h1>{this.state.page.label}</h1>
                </Layout_Main>
            </section>
        );
    }
}
