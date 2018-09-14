import React from 'react';
import { Button } from 'semantic-ui-react'

export default ({ name, color }) => {
    return ({ onSubmit }) => {
        return (
            <Button
                className='large-custom-btn'
                size='large'
                fluid
                color={color}
                onClick={onSubmit}>
                {name}
            </Button>
        );
    }
}
