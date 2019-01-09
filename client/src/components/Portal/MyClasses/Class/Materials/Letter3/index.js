import React from 'react';
import OverviewTable from '../OverviewTable';
import { Step1Sender, Step1Receiver } from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Step4Sender, Step4Receiver } from './Step4';
import {
    Header,
    Image,
    Form,
    Segment,
    Message,
    Button,
    Icon
} from 'semantic-ui-react';

const getSpecialContent = (role) => {
    const content = {
        sender: () => {
            return (
                <p>
                    Your class has the SENDER role in the Exchange.<br />
                    If you have received Letter 2 from the other class you are now ready to begin writing Letter 3.<br />
                    Once the other class receives Letter 3 from you, they will begin writing Letter 3 and these will be sent to your class. <br />
                    It is important that the students write their own name and the name of their letter friend clearly on every page in the Letter.<br />
                </p>
            );
        },
        receiver: () => {
            return (
                <p>
                    Your class has the RECEIVER role in the Exchange.<br />
                    This means that your class will wait until you receive Letter 3 from the other class before you begin writing Letter 3.<br />
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


const Letter3 = ({ letterURLs, classRole, exchangeClass }) => {
    const letterURL = letterURLs && letterURLs.letter3;
    return (
        <div>
            <h1>Instructions for Letter 3</h1>
            <p>Download and print the letter template and follow the instructions below for writing and sending the third and last letter.</p>
            {getSpecialContent(classRole)}
            <div className='div-centered-content'>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button'>
                        <Icon name='download'/>Download Letter 3 Template
                    </button>
                </a>
            </div>
            <OverviewTable letterName='letter3' />
            <hr style={{margin: '20px 0'}}/>
            { classRole === 'sender' ? <Step1Sender /> : <Step1Receiver /> }
            <hr style={{margin: '20px 0'}}/>
            <Step2 />
            <hr style={{margin: '20px 0'}}/>
            <Step3 exchangeClass={exchangeClass} />
            <hr style={{margin: '20px 0'}}/>
            { classRole === 'sender' ? <Step4Sender /> : <Step4Receiver /> }
            <h2>Congratulations you have completed the Peace Letters program!</h2>
        </div>
    );
}


export default Letter3;
