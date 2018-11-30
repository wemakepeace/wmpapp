import React from 'react';
import { Button } from 'semantic-ui-react'

export default ({ name, color, alias }) => {
    return ({ onSubmit }) => {
        return (
            <Button
                className='large-custom-btn'
                as={alias || 'button'}
                size='large'
                fluid
                color={color}
                onClick={onSubmit}>
                {name}
            </Button>
        );
    }
}
