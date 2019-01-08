import React, { Component, Fragment } from 'react';
import AppContext from 'Helpers/context';
import './style';
import SampleIcon from 'Icons/sample';
import SampleImage from 'Images/sample';

export default class SampleComponent extends Component {
    static contextType = AppContext;

    render() {
        const { test, _updateContextProperty } = this.context;

        return (
            <div>
                <p>SVG images are converted to Base64 and imported directly to JS bundle.</p>
                <p>Image on the left side is the SVG file (bundeled with JS); on the right side is the PNG file (loaded with another request).</p>

                <Fragment>
                    <img className="sample-image" src={SampleIcon} alt="Sample SVG icon" />
                    <img className="sample-image" src={SampleImage} alt="Sample JPG image" />

                    <p>{test}</p>

                    <button type="button" onClick={() => _updateContextProperty('test', Math.random())}>Update app's context...</button>
                </Fragment>
            </div>
        );
    }
}
