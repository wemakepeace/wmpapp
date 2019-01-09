import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Step2 = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 2</Header.Content>
            </Header>
            <h5>Writing the Letter 2</h5>
            <p>1 hour</p>
            <ul>
                <li>Hand out Letter 2 templates to the students.</li>
                <li>Letter 2 focuses on <em>Empathy</em> and <em>Acceptance</em>.</li>
            </ul>

            <h5>Discussion</h5>
            <p><em>Empathy</em></p>
            <p>Close your eyes. Imagine that you have swapped lives with your Letter Friend. How would your home be? Your school? What games would you play? How would you feel?</p>
            <p><em>Acceptance</em></p>
            <p>Why should we not accept bullying? Why is it better to accept each other the way we are?</p>
            <p>Give the students time to write a reply. They can also take the letter templates home and finish the letter as homework. Make sure you encourage the students to write full sentences.</p>
            <p>Make sure all the students write their names clearly in the letters.</p>
            <p>Make sure all the students write their Letter Friend's name clearly in the letters.</p>
            <p>If any students have identical names, make sure they include middle names or initials as well.</p>
            <p>If any of your students are sharing a Letter Friend, make sure both students write their names in the letter.</p>
        </div>
    );
}

export default Step2;
