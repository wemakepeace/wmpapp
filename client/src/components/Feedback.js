import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

const Feedback = ({type, messages}) => {
    return (
        <Message success={type === 'success'} warning={type==='error'}>
        {messages.map(message => <p>{message}</p>)}
        </Message>
    )

}

export default Feedback;
