import React, { Component } from 'react';
import Layout_Main from 'Layouts/Main';
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
        return (
            <section>
                <Layout_Main page={this.state.page}>
                    <h1>{this.state.page.label}</h1>

                    <SampleComponent />
                </Layout_Main>
            </section>
        );
    }
}
