import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import Address from '../Address';

const Step3 = ({ exchangeClass }) => {
    const { school, teacher, name } = exchangeClass;

    return (
        <div>
            <hr style={{margin: '20px 0'}} />
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 3</Header.Content>
            </Header>
            <h3>Mailing the letters</h3>
            <p>Before mailing the letters please make sure that all students have written their <b>own names</b> clearly on the letters.</p>
            <p>Please make sure that the students also have written their <b>Letter Friend's name</b> clearly in the letters.</p>
            <p>Make sure that each students' letter has been stapled or clipped together.</p>
            <p>Post the letters to the attention of the teacher and class at the school. If in doubt double-check with the teacher via email before posting the pack in the mail.</p>
            <Address classData={exchangeClass} />
        </div>
    );
}

export default Step3;
