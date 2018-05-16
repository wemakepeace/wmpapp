import React from 'react';
import { Button } from 'semantic-ui-react'

const ExhangeDetails = ({ status, onActionClick, serverFeedback, classIsVerified }) => {

    if (status === 'pending' && classIsVerified) {
        status = 'partially confirmed'
    }

    return (
        <div className='profile-segment exchange-details'>
            { status
                ? <div>
                    <h3 style={{ display: 'inline-block', marginRight: '20px'}}>Exchange Status</h3>
                    <span>{status}</span>
                </div>
                : null }
            <div style={{fontSize: '20px', border: '1px solid gray', padding: '20px', margin: '40px 0', lineHeight: '1.5em'}}>
                {exchangeData[status].text}
            </div>
            { exchangeData[status].buttonText && !classIsVerified
                ? <Button
                        className='large-custom-btn'
                        size='large'
                        fluid
                        onClick={() => onActionClick(exchangeData[status].action)}>
                        {exchangeData[status].buttonText}</Button>
                : null }
        </div>
    )
}

export default ExhangeDetails;

const exchangeData = {
    null: {
        text: "By clicking START EXCHANGE your class will be signed up to participate in the Peace Letter program.",
        buttonText: 'START EXCHANGE',
        action: "initiateExchange"

    },
    initiated: {
        text: "Your class is signed up to participate in the Peace Letter Exchange Program, and we are currently searching for a class to match with. Look out for an email and make sure to confirm the Exchange particpation once you receive the email"
    },
    pending: {
        text: "We have found a match for your class! Please verify your class' participation within 7 days. Thank you for participating!",
        buttonText: "Verify Exchange Participation",
        action: "verifyExchange"
    },
    'partially confirmed': {
        text: "Your paritication in the program is verified! We are waiting for the other class to verify as well. Please be on the lookout for an email confirmation."
    },
    confirmed: {
        text: "Thank you for confirming your participaiton! You are now ready to begin the Exchange Program!"
    }
}
