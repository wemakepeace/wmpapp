import React from 'react';
import { Button } from 'semantic-ui-react';
import { ProgressBar } from './ProgressBar';

const exchangeStatusData = {
    'not started': {
        text: () => (
            <div>
                <p>When you have filled in all the information, click the button to initiate an exchange.</p>
                <p>When a match has been made you will receive an email and you will be able to see more information about the exchange on this page.</p>
                <p>By clicking START EXCHANGE your class will be signed up to participate in the Peace Letter program.</p>
            </div>
        ),
        buttonText: 'START EXCHANGE',
        action: "initiateExchange",
        percent: 0,
        label: 'Not started'
    },
    initiated: {
        text: () => (
            <div>
                <p>Your class is signed up to participate in the Peace Letter Exchange Program, and we are currently searching for a class to match with.</p>
                <p>Look out for an email and make sure to confirm the Exchange particpation once you receive the email</p>
            </div>
        ),
        percent: 16,
        label: "Initiated"
    },
    pending: {
        text: () => (
            <div>
                <p>We have found a match for your class!</p>
                <p>Please verify your class' participation within 7 days.</p>
                <p>Thank you for participating!</p>
            </div>
        ),
        buttonText: "Confirm Exchange Participation",
        action: "verifyExchange",
        percent: 32,
        label: "Pending"
    },
    'partially confirmed': {
        text: () => (
            <div>
                <p>Your paritication in the program is verified!</p>
                <p>We are waiting for the other class to verify as well. Please be on the lookout for an email confirmation.</p>
            </div>
        ),
        percent: 48,
        label: "Partially Confirmed"
    },
    confirmed: {
        text: ()=> (
            <div>
                <p>Thank you for confirming your participaiton!</p>
                <p>You are now ready to begin the Exchange Program!</p>
            </div>
        ),
        percent: 64,
        label: 'Confirmed'
    },
    inprogress: {
        text: () => (
            <div>
                <p>Exchange is in progress!</p>
            </div>
        ),
        percent: 80,
        label: 'In Progress'
    },
    completed: {
        text: () => (
            <div>
                <p>Exchange completed!</p>
            </div>
        ),
        percent: 100,
        label: 'Completed'
    },
    cancelled: {
        text: () => (
            <div>
                <p>Exchange cancelled.</p>
            </div>
        )
    }
}


export const ExchangeStatus = ({ status, classIsVerified, onExchangeActionClick }) => {
    if (status === 'pending' && classIsVerified) {
        status = 'partially confirmed';
    }

    if (!status) {
        status = 'not started';
    }

    const details = exchangeStatusData[ status ];

    return (
        <div>
            <div className="flex-outer">
                <div className="flex-inner-1">
                    <div className="flex-item border">
                        <label>Exchange Status</label>
                    </div>
                    <div className="flex-item status">
                        <span className='status-span'>{status}</span>
                    </div>
                </div>
                <div className="flex-inner-3">
                    <div className="flex-item border">
                        <label>Next Steps</label>
                    </div>
                    <div className="flex-item">
                        {details.text()}
                    </div>
                </div>
            </div>
            <ProgressBar percent={details.percent} label={details.label} />
            <div className="btn-wrapper">
            { details.buttonText && !classIsVerified ?
                <Button
                    className='large-custom-btn center-btn'
                    size='large'
                    onClick={() => onExchangeActionClick(details.action)}>
                    {details.buttonText}
                </Button> : null }
            </div>
        </div>
    );
}
