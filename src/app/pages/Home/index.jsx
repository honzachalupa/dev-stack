import React, { Component } from 'react';
import Layout from 'Layouts/Main';
import SampleComponent from 'Components/SampleComponent';

export default class Page_Home extends Component {
    constructor() {
        super();

        this.state = {
            page: {
                label: 'Welcome'
            }
        };
    }

    render() {
        const { page } = this.state;

        return (
            <section>
                <Layout page={page}>
                    <h1>{page.label}</h1>

                    <SampleComponent />
                </Layout>
            </section>
        );
    }
}
