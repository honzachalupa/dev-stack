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
        const { page } = this.state;

        return (
            <section>
                <Layout_Main page={page}>
                    <h1>{page.label}</h1>
                </Layout_Main>
            </section>
        );
    }
}
