import React from 'react';
import OverviewTable from '../OverviewTable'
import { Icon } from 'semantic-ui-react';
import ImportantMessage from './ImportantMessage';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const Letter1 = ({ classRole, exchangeClass, materials }) => {
    const letterURL = materials && materials.letter1;
    const instructionsURL = materials && materials.instruction1;

    return (
        <div>
            <h2>Materials Letter 1</h2>
            <p>Download and print the letter template.</p>
            <p>You can download the instructions for letter 1 as well, or you can follow the instructions below for writing and sending the first letter.</p>
            <div>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button download'>
                        <Icon name='download'/>Letter 1 Template
                    </button>
                </a>
                <a href={instructionsURL} target='_blank'>
                    <button className='roll-button download'>
                        <Icon name='download'/>Letter 1 Instructions
                    </button>
                </a>
            </div>
            <h2>Instructions Letter 1</h2>
            <ImportantMessage classRole={classRole} />
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
