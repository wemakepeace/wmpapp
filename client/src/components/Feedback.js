import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

const Feedback = ({type, messages}) => {
    return (
        <Message animation='fade' success={type === 'success'} warning={type==='error'}>
        {messages.map((message, i) => <p key={i}>{message}</p>)}
        </Message>
    )

}

export default Feedback;
