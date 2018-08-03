import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

const Feedback = ({ type, messages }) => {
    if (!type || !messages) {
        return null;
    }

    const iconName = type === 'error' ? 'times circle outline' : 'check circle outline';
    return (
        <div className={`${type} feedback`}>
            <div className='feedback-inner'>
            { messages.map((message, i) => <span key={i}><Icon name={iconName} />{ message }</span>) }
            </div>
        </div>
    );
}

export default Feedback;
