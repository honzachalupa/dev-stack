import React, { Component } from 'react';
import Layout from 'Layouts/Main';

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
                <Layout page={page}>
                    <h1>{page.label}</h1>
                </Layout>
            </section>
        );
    }
}
