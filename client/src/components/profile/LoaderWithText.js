import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react'

export const LoaderWithText = ({ loading, exchangeAction }) => {
    const loaderText = {
        initiateExchange: 'Initiating Exchange',
        verifyExchange: 'Confirming Your Exchange Participation'
    };

    const text = loaderText[ exchangeAction ] ? loaderText[ exchangeAction ] : 'Loading...';

    if (!loading) return null;

    return (
        <div>
            <Dimmer active={loading} inverted page={true} >
                <Loader indeterminate>{text}</Loader>
            </Dimmer>
        </div>
    );
}
