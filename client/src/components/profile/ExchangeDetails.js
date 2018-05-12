import React from 'react';
import { Button } from 'semantic-ui-react'

const ExhangeDetails = ({ exchange }) => {
    return (
        <div className='profile-segment exchange-details'>
            <div className=''>
                <h3 style={{ display: 'inline-block', marginRight: '20px'}}>Exchange Status</h3>
                <span>{exchange.status || null}</span>
            </div>
            <div style={{fontSize: '20px', border: '1px solid gray', padding: '20px', margin: '40px 0', lineHeight: '1.5em'}}>
                {exchangeData[exchange.status].text}
            </div>
            { exchangeData[exchange.status].buttonUrl
                ?   <Button
                        className='large-custom-btn'
                        size='large'
                        onClick={console.log('c')}>
                        {exchangeData[exchange.status].buttonText}
                    </Button>
                :   null }
        </div>
    )
}

export default ExhangeDetails;

const exchangeData = {
    initiated: {
        text: "Your class is signed up to participate in the Peace Letter Exchange Program, and we are currently searching for a class to match with. Look out for an email and make sure to confirm the Exchange particpation once you receive the email"
    },
    pending: {
        text: "We have found a match for your class! Please verify your class' participation within 7 days. Thank you for participating!",
        buttonUrl: "/",
        buttonText: "Verify Exchange Participation"
    }
}
