import React from 'react';
import { Button } from 'semantic-ui-react'
import { Progress } from 'semantic-ui-react'

const ProgressBar = ({ percent, label }) => (
  <Progress percent={percent} label={label} color='yellow'/>
)




const ExhangeDetails = ({ status, onActionClick, serverFeedback, classIsVerified, classData }) => {

    if (status === 'pending' && classIsVerified) {
        status = 'partially confirmed'
    }

    if (!status) {
        status = 'Not started'
    }
    const details = exchangeData[status];


    return (
        <div className='profile-segment exchange-details'>
            {/*<div>
                <h3 style={{ display: 'inline-block', marginRight: '20px'}}>Exchange Status</h3>
                <span>{status}</span>
            </div> */}
            <div className='div-display-inline-block'>
                <div className='class-overview'>
                    <div className=''>
                        <label>Age group</label>
                        <label>Registered for term</label>
                    </div>
                    <div className=''>
                        { classData.age_group
                            ? <span>{classData.age_group.label || null }</span>
                            : <span>Not specified yet</span>
                        }
                        { classData.term
                            ? <span>{classData.term.label || null }</span>
                            : <span>Not specified yet</span>
                        }
                    </div>
                </div>
            </div>
            <h4>Status</h4>
            <ProgressBar percent={details.percent} label={details.label} />
            <div style={{fontSize: '20px', border: '1px solid gray', padding: '20px', margin: '40px 0', lineHeight: '1.5em'}}>
                {details.text()}
            </div>
            { details.buttonText && !classIsVerified
                ? <Button
                        className='large-custom-btn'
                        size='large'
                        fluid
                        onClick={() => onActionClick(details.action)}>
                        {details.buttonText}</Button>
                : null }
        </div>
    )
}

export default ExhangeDetails;

const exchangeData = {
    'Not started': {
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
        percent: 20,
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
        buttonText: "Verify Exchange Participation",
        action: "verifyExchange",
        percent: 40,
        label: "Pending"
    },
    'partially confirmed': {
        text: () => (
            <div>
                <p>Your paritication in the program is verified!</p>
                <p>We are waiting for the other class to verify as well. Please be on the lookout for an email confirmation.</p>
            </div>
        ),
        percent: 60,
        label: "Partially Confirmed"
    },
    confirmed: {
        text: ()=> (
            <div>
                <p>Thank you for confirming your participaiton!</p>
                <p>You are now ready to begin the Exchange Program!</p>
            </div>
        ),
        percent: 80,
        label: 'Confirmed'
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
