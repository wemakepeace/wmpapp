import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoaderWithText = ({ loading, text }) => {

    if (!loading) return null;

    return (
        <div>
            <Dimmer active={loading} inverted page={true} >
                <Loader indeterminate>{text}</Loader>
            </Dimmer>
        </div>
    );
}
