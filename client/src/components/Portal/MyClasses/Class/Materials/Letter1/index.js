import React from 'react';
import OverviewTable from '../OverviewTable'
import {
    Header,
    Message,
    Button,
    Icon
} from 'semantic-ui-react';
import Step1 from './Step1';
import { Step2Sender, Step2Receiver } from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';


const getSpecialContent = (role) => {
    const content = {
        sender: () => {
            return (
                <p>Your class has the SENDER role in the Exchange.<br />
                This means that your class will start by writing and sending Letter 1 to the other class.<br />
                Once the other class receives Letter 1 from you, they will begin writing Letter 1 and these will be sent to your class.<br />
                It is important that the students write their own name clearly on every page in the Letter.</p>
            );
        },
        receiver: () => {
            return (
                <p>
                   Your class has the RECEIVER role in the Exchange.<br />
                   This means that your class will wait until you receive Letter 1 from the other class before you begin writing and sending Letter 1.<br />
                   It is important that the students write their own name and the name of their letter friend clearly in the Letter.<br />
                </p>
            );
        }
    }


    return (
        <div>
            <Message size='large' color='yellow'>
                <h3><Icon name='info' />Important Information</h3>
                {content[ role ]()}
            </Message>
        </div>
    );
}



const Letter1 = ({ letterURLs, classRole, exchangeClass }) => {
    // letter1 is slightly different depending on classRole
    const letterURL = letterURLs && letterURLs.letter1[ classRole ];
    return (
        <div>
            <h1>Instructions for Letter 1</h1>
            <p>Download and print the letter template and follow the instructions below for writing and sending the first letter.</p>
            {getSpecialContent(classRole)}
            <div className='div-centered-content'>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button'>
                        <Icon name='download'/>Download Letter 1 Template
                    </button>
                </a>
            </div>
            <OverviewTable letterName='letter1' />
            <hr style={{margin: '20px 0'}}/>
            <Step1 />
            <hr style={{margin: '20px 0'}}/>
            { classRole === 'sender' ? <Step2Sender /> : <Step2Receiver /> }
            <hr style={{margin: '20px 0'}}/>
            <Step3 />
            <hr style={{margin: '20px 0'}}/>
            <Step4 exchangeClass={exchangeClass} />
            <hr style={{margin: '20px 0'}}/>
            <Step5 />
        </div>
    );
}


export default Letter1;
