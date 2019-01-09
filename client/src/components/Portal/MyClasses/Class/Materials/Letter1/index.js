import React from 'react';
import OverviewTable from '../OverviewTable'
import { Icon } from 'semantic-ui-react';
import ImportantMessage from './ImportantMessage';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const Letter1 = ({ letterURLs, classRole, exchangeClass }) => {
    const letterURL = letterURLs && letterURLs.letter1[ classRole ];

    return (
        <div>
            <h1>Instructions for Letter 1</h1>
            <p>Download and print the letter template and follow the instructions below for writing and sending the first letter.</p>
            <ImportantMessage classRole={classRole} />
            <div className='div-centered-content'>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button'>
                        <Icon name='download'/>Download Letter 1 Template
                    </button>
                </a>
            </div>
            <OverviewTable letterName='letter1' />
            <Step1 />
            <Step2 classRole={classRole} />
            <Step3 />
            <Step4 exchangeClass={exchangeClass} />
            <Step5 />
        </div>
    );
}

export default Letter1;
