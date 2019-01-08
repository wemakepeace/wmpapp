import React from 'react';
import { Button } from 'semantic-ui-react';
import { ProgressBar } from './ProgressBar';

const exchangeStatusData = {
    'not started': {
        text: () => (
            <div>
                <h3>Begin Exchange</h3>
                <p>When you have filled in all the information, click the button to initiate an exchange.</p>
                <p>When a match has been made you will receive an email and you will be able to see more information about the exchange on this page.</p>
                <p>By clicking START EXCHANGE your class will be signed up to participate in the Peace Letter program.</p>
            </div>
        ),
        buttonText: 'START EXCHANGE',
        action: "initiateExchange",
        percent: 0,
        label: 'Exchange not started'
    },
    initiated: {
        text: () => (
            <div>
                <h3>Your class has been signed up!</h3>
                <p>Your class is signed up to participate in the Peace Letter Exchange Program, and we are currently searching for a class to match your class with.</p>
                <p>Look out for an email and make sure to confirm the particpation in the exchange once you receive an email.</p>
            </div>
        ),
        percent: 25,
        label: "Your class is signed up!"
    },
    pending: {
        text: () => (
            <div>
                <h3>Great news! We have found a match for your class!</h3>
                <p>Please verify your class' participation within 7 days by clicking the button below.</p>
            </div>
        ),
        buttonText: "Confirm Exchange Participation",
        action: "verifyExchange",
        percent: 50,
        label: "Awaiting participation confirmation"
    },
    'partially confirmed': {
        text: () => (
            <div>
                <h3>Your paritication in the program is confirmed!</h3>
                <p>We are waiting for the other class to confirm their participation as well.</p>
                <p>Please be on the lookout for an email confirmation.</p>
                <p>Once both classes have confirmed you will be granted access to the program materials and ready to start the exchange.</p>
            </div>
        ),
        percent: 75,
        label: "Waiting for the other class to confirm"
    },
    confirmed: {
        text: ()=> (
            <div>
                <h3>Congrats! You are now ready to begin the Exchange Program!</h3>
                <p>Please see the instructions under Materials for next steps <a href='/#/portal/materials/instructions'>here</a>.</p>
                <p>Have fun and make sure to communicate with the other teacher and most of all, have fun!</p>
            </div>
        ),
        percent: 100,
        label: 'Ready to begin the program!'
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
                <div className="flex-inner-3">
                    <div className="flex-item border">
                        <label>Next steps</label>
                    </div>
                    <div className="flex-item">
                        {details.text()}
                    </div>
                    <div className="flex-item center">
                        { details.buttonText && !classIsVerified ?
                            <Button
                                className='large-custom-btn center-btn'
                                size='large'
                                onClick={() => onExchangeActionClick(details.action)}>
                                {details.buttonText}
                            </Button> : null }
                    </div>
                </div>
            </div>
            <ProgressBar percent={details.percent} label={details.label} />
        </div>
    );
}
