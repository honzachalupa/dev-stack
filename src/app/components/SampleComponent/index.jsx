import React, { Fragment, useContext } from 'react';
import { Context } from '@honzachalupa/helpers';
import './style';
import SampleIcon from 'Icons/sample';
import SampleImage from 'Images/sample';

export default () => {
    const { testValue, setTestValue } = useContext(Context);

    return (
        <div>
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
