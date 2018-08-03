import React from 'react';
import { Button } from 'semantic-ui-react'

export default ({ name }) => {
    return ({ onSubmit }) => {
        return (
            <Button
                className='large-custom-btn'
                size='large'
                fluid
                onClick={onSubmit}>
                {name}
            </Button>
        );
    }
}
