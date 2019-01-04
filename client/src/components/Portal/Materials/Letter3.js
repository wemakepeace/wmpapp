import React from 'react';
import { OverviewTable } from './OverviewTable'
import {
    Header,
    Image,
    Form,
    Segment,
    Message,
    Button,
    Icon
} from 'semantic-ui-react';

const tableContent = {
    cell1: 'Blackboard, Letter 3 Templates',
    cell2: 'Reading, listening, sharing, letter writing.',
    cell3: 'Peace, empathy, positivism, love, acceptance, compassion, creativity, solution-based thinking, trouble-shooting, new skill, letter writing, processing new concepts, analytical skills.'
};

const specialContent = {
    sender: () => {
        return (
            <div>
                <Message size='large' color='yellow'>
                    <ul>
                        <li>Your class has the SENDER role in the Exchange.</li>
                        <li>If you have received Letter 2 from the other class you are now ready to begin writing Letter 3.</li>
                        <li>Once the other class receives Letter 3 from you, they will begin writing Letter 3 and these will be sent to your class. </li>
                        <li>It is important that the students write their own name and the name of their letter friend clearly in the Letter.</li>
                    </ul>
                </Message>
            </div>
        )
    },
    receiver: () => {
        return (
            <div>
                <Message size='large' color='yellow'>
                    <ul>
                        <li>Your class has the RECEIVER role in the Exchange.</li>
                        <li>This means that your class will wait until you receive Letter 3 from the other class before you begin writing Letter 3.</li>
                        <li>It is important that the students write their own name and the name of their letter friend clearly in the Letter.</li>
                    </ul>
                </Message>
            </div>
        )
    }
};



const StepOneSender = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 1</Header.Content>
            </Header>
            <h3>Reading the letters</h3>
            <p>30-40 minutes</p>
            <ul>
                <li>You should now have received Letter 2 from the other class.</li>
                <li>Hand out the letters to the students. Your students' names should be written on the front of the letters.</li>
                <li>If any of your students are sharing a Letter Friend, make sure they are sitting together.</li>
                <li>If any of your students have two Letter Friends, they should write one collective letter to both Letter Friends. Make sure these students write both of the Letter Friends' names in the letter.</li>
                <li>Let the students have some time to read their letters and ask questions. Then tell them to share thoughts from their letters with the rest of the class.</li>
            </ul>
            <h4>Questions to the group</h4>
            <ul>
                <li>What more have you learned about your Peace Friend?</li>
                <li>Why is it good that we are different?</li>
                <li>Do you feel closer to your Peace Friend now that you have received a second letter?</li>
                <li>What did your Peace Friend draw?</li>
            </ul>
        </div>
    );
}


const StepOneReceiver = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 1</Header.Content>
            </Header>
            <h3>Reading the letters</h3>
            <p>30-40 minutes</p>
            <ul>
                <li>You should now have received Letter 3 from the other class.</li>
                <li>Hand out the letters to the students. Your students' names should be written on the front of the letters.</li>
                <li>If any of your students are sharing a Letter Friend, make sure they are sitting together.</li>
                <li>If any of your students have two Letter Friends, they should write one collective letter to both Letter Friends. Make sure these students write both of the Letter Friends' names in the letter.</li>
                <li>Let the students have some time to read their letters and ask questions. Then tell them to share thoughts from their letters with the rest of the class.</li>
            </ul>
            <h4>Questions to the group</h4>
            <ul>
                <li>What more have you learned about your Peace Friend?</li>
                <li>What have you learned about their school?</li>
                <li>Do you feel closer to your Peace Friend now that you have received a third letter?</li>
                <li>What did your Peace Friend draw?</li>
            </ul>
        </div>
    );
}


const StepTwo = () => {
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

const StepThree = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 3</Header.Content>
            </Header>
            <h3>Mailing the letters</h3>
            <p>Before mailing the letters please make sure that all students have written their <b>own names</b> clearly on the letters.</p>
            <p>Please make sure that the students also have written their <b>Letter Friend's name</b> clearly in the letters</p>
            <p>Post the letters to the attention of the teacher at the school and address listed on the Exchange Overview page. If in doubt double-check with the teacher via email before posting the pack in the mail.</p>
        </div>
    );
}


const StepFourSender = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 4</Header.Content>
            </Header>
            <h3>Completion</h3>
            <p>Once the Letter 3 has been sent, you will wait until you have received Letter 3 from the other class. This should happen within a month's time.</p>
            <p>Please take the time to read through the letters with your students.</p>
            <p>We encourage you to have a discussion with your students about their experience writing with their Letter Friends. Ask them what was fun and what was difficult about it. Explain that they are welcome and encouraged to continue writing with their Letter Friends outside school.</p>
        </div>
    );
}

const StepFourReceiver = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 4</Header.Content>
            </Header>
            <h3>Completion</h3>
            <p>Once the Letter 3 has been sent your class has officially completed the Peace Letter Program.</p>
            <p>We encourage you to have a discussion with your students about their experience writing with their Letter Friends. Ask them what was fun and what was difficult about it. Explain that they are welcome and encouraged to continue writing with their Letter Friends outside school.</p>
        </div>
    );
}

const Letter3 = ({ letterURLs, classRole }) => {
    const letterURL = letterURLs && letterURLs.letter3;
    return (
        <div>
            <h1>Instructions for Letter 3</h1>
            <p>Download and print the letter template and follow the instructions below for writing and sending the third and last letter.</p>
            { specialContent[ classRole ]()}
            <div className='div-centered-content'>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button'>
                        <Icon name='download'/>Download Letter 3 Template
                    </button>
                </a>
            </div>
            <OverviewTable content={tableContent} />
            <hr style={{margin: '20px 0'}}/>
            { classRole === 'sender' ? <StepOneSender /> : <StepOneReceiver /> }
            <hr style={{margin: '20px 0'}}/>
            <StepTwo />
            <hr style={{margin: '20px 0'}}/>
            <StepThree />
            <hr style={{margin: '20px 0'}}/>
            { classRole === 'sender' ? <StepFourSender /> : <StepFourReceiver /> }
            <h2>Congratulations you have completed the Peace Letters program!</h2>
        </div>
    );
}


export default Letter3;
