import React from 'react';
import { Button } from 'semantic-ui-react';
import { ProgressBar } from './ProgressBar';
import { getCountryName } from '../../../../../utils/helpers';

const exchangeStatusData = {
    'not started': {
        text: () => (
            <div>
                <h3>Initiate Exchange Program Participation</h3>
                <p>Thank you for signing up your class.</p>
                <p>By clicking the Start Exchange button below, your class will be signed up to participate in the Peace Letter program.</p>
            </div>
        ),
        buttonText: 'START EXCHANGE',
        action: "initiateExchange",
        percent: 0,
        label: 'Ready to initiate exchange participation'
    },
    initiated: {
        text: () => (
            <div>
                <h3>Your class has been signed up!</h3>
                <p>Your class is signed up to participate in the Peace Letter Program, and we are currently searching for a class to match your class with.</p>
                <p>Look out for an email and make sure to confirm the exchange particpation once you receive an email.</p>
            </div>
        ),
        percent: 25,
        label: "Your class is signed up"
    },
    pending: {
        text: (exchange) => {
            const { name, school: { country } } = exchange.exchangeClass;
            return (
                <div>
                    <h3>Great news! Your class has been matched with a class from {getCountryName(country)} </h3>
                    <p>You can check out the other class details under <a href='/#/portal/my-classes/exchange-details'>Exchange Details</a></p>
                    <p>Please verify your class' participation within 7 days.</p>
                </div>
            );
        },
        buttonText: "Confirm Exchange Participation",
        action: "verifyExchange",
        percent: 50,
        label: "Awaiting confirmation"
    },
    'partially confirmed': {
        text: (exchange) => {
            const { school: { country } } = exchange.exchangeClass;
            return (
                <div>
                    <h3>Your paritication in the program is confirmed</h3>
                    <p>We are waiting for the exchange class from {getCountryName(country)} to confirm their participation as well.</p>
                    <p>Please be on the lookout for an email confirmation.</p>
                    <p>Once both classes have confirmed you will be granted access to the program materials and ready to start the letter writing journey.</p>
                </div>
            );
        },
        percent: 75,
        label: "Waiting for the other class to confirm"
    },
    confirmed: {
        text: (exchange) => {
            const {
                name,
                school: { country },
                teacher: { firstName, lastName, email }
            } = exchange.exchangeClass;

            return (
                <div>
                    <h3>Congrats! You are now ready to begin the Exchange Program</h3>
                    <p>Your class will be exchanging letters with class {name} from {getCountryName(country)}.</p>
                    <p>The exchange class teacher is {firstName} {lastName}.</p>
                    <p>Please see the instructions under Materials for next steps <a href='/#/portal/my-classes/materials/information'>here</a>.</p>
                    <p>Make sure to connect with the other teacher via their email address {email}, and most importantly of all have fun.</p>
                    <p>Thank you for being part of the Peace Letter community!</p>
                </div>
            );
        },
        percent: 100,
        label: 'Ready to begin the program'
    }
}


export const Status = ({ status, classIsVerified, onExchangeActionClick, exchange }) => {
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
                    <div className="flex-item">
                        {details.text(exchange)}
                    </div>
                    <div className="flex-item">
                        { details.buttonText && !classIsVerified ?
                            <Button
                                className='large-custom-btn'
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
