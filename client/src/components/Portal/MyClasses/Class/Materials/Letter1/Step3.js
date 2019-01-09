import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Step3 = () => {
    return (
        <div>
            <hr style={{margin: '20px 0'}}/>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 3</Header.Content>
            </Header>
            <h3>Writing the letters</h3>
            <p> 1 hour</p>
            <ul>
                <li>Print and hand out the Letter 1 Templates to all students.</li>
                <li>Ask the students to bring a photo of themselves to add to the letter.</li>
                <li>Letter 1 focuses <em>Positivity</em>.</li>
            </ul>
            <p>The first part of the letter exchange is an introduction of themselves as well as a focus on how we can use Positivity to make peace in our daily lives. Make sure you encourage the students to write full sentences.</p>
            <p>Make sure all the students write their names clearly in the letters.</p>
            <p>Make sure all the students write their Letter Friend's name clearly in the letters.</p>
            <p>If any students have identical names, make sure they include middle names or initials as well.</p>
            <p>If any of your students are sharing a Letter Friend, make sure both students write their names in the letter.</p>
        </div>
    );
}

export default Step3;
