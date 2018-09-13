import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoaderWithText = ({ loading, action }) => {

    if (!loading) return null;

    return (
        <div>
            <Dimmer active={loading} inverted page={true} >
                <Loader indeterminate>{action}</Loader>
            </Dimmer>
        </div>
    );
}
