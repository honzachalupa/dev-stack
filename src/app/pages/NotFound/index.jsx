import React, { Component } from 'react';
import Layout_Main from 'Layouts/Main';

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
            <section>
                <Layout_Main page={this.state.page}>
                    <h1>{this.state.page.label}</h1>
                </Layout_Main>
            </section>
        );
    }
}
