import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Step4 = () => {
    return (
        <div>
            <hr style={{margin: '20px 0'}} />
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 4</Header.Content>
            </Header>
            <h3>Wait to receive the next letters from the other class</h3>
            <p>Once the letters have been sent, you will need to wait until you have received new letters from the other class. This should happen within a month's time.</p>
            <p>While waiting you are encouraged to talk to the students about what they have learned about their Letter Friends and the country or place where they are from.</p>
            <p>Once you have received the letters, please continue to the instructions for the next letter writing.</p>
        </div>
    );
}


export default Step4;
