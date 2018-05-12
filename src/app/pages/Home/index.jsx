import React, { Component } from 'react';
import Layout_Main from './../../layouts/Main';
import SampleComponent from './../../components/SampleComponent';

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
