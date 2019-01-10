import React from 'react';
import OverviewTable from '../OverviewTable'
import ImportantMessage from './ImportantMessage';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { Icon } from 'semantic-ui-react';


const Letter2 = ({ classRole, exchangeClass, materials }) => {
    const letterURL = materials && materials.letter2;
    return (
        <div>
            <h1>Instructions for Letter 2</h1>
            <p>Download and print the letter template and follow the instructions below for writing and sending the second letter.</p>
            <ImportantMessage classRole={classRole} />
            <div className='div-centered-content'>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button'>
                        <Icon name='download'/>Download Letter 2 Template
                    </button>
                </a>
            </div>
            <OverviewTable letterName='letter2' />
            <Step1 classRole={classRole} />
            <Step2 />
            <Step3 exchangeClass={exchangeClass} />
            <Step4 />
        </div>
    );
}


export default Letter2;
