import React, { Component, Fragment } from 'react';
import { AppContext } from './../../App';
import './style';
import SampleIcon from './../../../images/icons/sample';
import SampleImage from './../../../images/sample';

export default class SampleComponent extends Component {
    render() {
        return (
            <div>
                <p>SVG images are converted to Base64 and imported directly to JS bundle.</p>
                <p>Image on the left side is the SVG file (bundeled with JS); on the right side is the PNG file (loaded with another request).</p>

                <AppContext.Consumer>
                    {({ test, _updateContextProperty }) => {
                        return (
                            <Fragment>
                                <img className="sample-image" src={SampleIcon} alt="Sample SVG icon" />
                                <img className="sample-image" src={SampleImage} alt="Sample JPG image" />

                                <p>{test}</p>

                                <button onClick={() => _updateContextProperty('test', Math.random())}>Update app's context...</button>
                            </Fragment>
                        );
                    }}
                </AppContext.Consumer>
            </div>
        );
    }
}
