import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Step2 = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 2</Header.Content>
            </Header>
            <h5>Writing the letters</h5>
            <p>1 hour</p>
            <ul>
                <li>Hand out Letter 3 templates to the students.</li>
                <li>Letter 3 focuses on <em>Compassion</em> and <em>Equality</em>.</li>
            </ul>

            <h5>Discussion</h5>
            <p><em>Compassion</em></p>
            <p>How can you show compassion in your letter?</p>
            <p><em>Equality</em></p>
            <p>What does it mean that we are all equal?</p>
            <p>Why are we still not always treating each other as equals?</p>
            <p>What can we do to change that?</p>
            <p>Give the students time to think and write a reply. These are not simple questions. They can also take the templates home and finish the letter as homework. Make sure you encourage the students to write full sentences.</p>
            <h5>NOTE</h5>
            <p>This is the last letter facilitated through the Peace Letter program. There is allocated space on the last page of Letter 3 where the students can share their private mail address with each other. Make sure the students have the permission from their parents to write their home address in the box.</p>
            <p>If they do not wish to continue the exchange they can leave it blank.</p>
        </div>
    );
}

export default Step2;
