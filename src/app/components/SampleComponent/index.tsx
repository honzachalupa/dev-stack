import { Context } from '@honzachalupa/helpers';
import SampleIcon from 'Icons/sample.svg';
import SampleImage from 'Images/sample.png';
import { IContext } from 'Interfaces/Context';
import React, { Fragment, useContext } from 'react';

export default () => {
    const { testValue, setTestValue } = useContext<IContext>(Context);

    return (
        <div data-component="SampleComponent">
            <p>SVG images are converted to Base64 and imported directly to JS bundle.</p>
            <p>Image on the left side is the SVG file (bundeled with JS); on the right side is the PNG file (loaded with another request).</p>

            <Fragment>
                <img className="sample-image" src={SampleIcon} alt="Sample SVG icon" />
                <img className="sample-image" src={SampleImage} alt="Sample JPG image" />

                <p>{testValue}</p>

                <button type="button" onClick={() => setTestValue(`New value (${Math.random()})`)}>Update AppContext</button>
            </Fragment>
        </div>
    );
};
