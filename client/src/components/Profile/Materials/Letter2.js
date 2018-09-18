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
    cell1: 'Blackboard, Letter 2 Templates',
    cell2: 'Reading, listening, sharing, letter writing.',
    cell3: 'Empathy, positivism, love, acceptance, compassion, creativity, solution-based thinking, trouble-shooting, new skill, letter writing, processing new concepts, analytical skills.'
};

const specialContent = {
    sender: () => {
        return (
            <div>
                <Message size='large' color='yellow'>
                    <ul>
                        <li>Your class has the SENDER role in the Exchange.</li>
                        <li>If you have received Letter 1 from the other class you are ready to begin writing Letter 2.</li>
                        <li>Once the other class receives Letter 2 from you, they will begin writing Letter 2 and these will be sent to your class. </li>
                        <li>It is important that the students write their own name and the name of their letter friend clearly in the Letter.</li>
                    </ul>
                </Message>
                <h4>Steps</h4>
                <ul>
                    <li>Step 1 - Lesson: Reading the letters</li>
                    <li>Step 2 - Lesson: Questions for your letter friend</li>
                    <li>Step 3 - Writing the letters</li>
                    <li>Step 4 - Wait to receive Letter 2 from the other class</li>
                </ul>
            </div>
        )
    },
    receiver: () => {
        return (
            <div>
                <Message size='large' color='yellow'>
                    <ul>
                        <li>Your class has the RECEIVER role in the Exchange.</li>
                        <li>This means that your class will wait until you receive Letter 2 from the other class before you begin writing Letter 2.</li>
                        <li>It is important that the students write their own name and the name of their letter friend clearly in the Letter.</li>
                    </ul>
                </Message>
                <h4>Steps</h4>
                <ul>
                    <li>Step 1 - Reading the letters</li>
                    <li>Step 2 - Writing the letters</li>
                    <li>Step 3 - Mailing the letters</li>
                    <li>Step 4 - Wait to receive Letter 3 from the other class</li>
                </ul>
            </div>
        )
    }
}

const StepOneSender = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 1</Header.Content>
            </Header>
            <h3>Reading the letters</h3>
            <p>30-40 minutes</p>
            <ul>
                <li>Hand out the letters to the students. Your students' names should be written on the front of the letters.</li>
                <li>If any of your students are sharing a Letter Friend, make sure they are sitting together.</li>
                <li>If any of your students have two Letter Friends, they should write one collective letter to both Letter Friends. Make sure these students write both of the Letter Friends' names in the letter.</li>
                <li>Let the students have some time to read their letters and ask questions. Then tell them to share thoughts from their letters with the rest of the class.</li>
            </ul>
            <h4>Questions to the group</h4>
            <ul>
                <li>What have you learned about your Letter Friend?</li>
                <li>Did anything surprise you?</li>
                <li>What are the similarities and what are the differences in how you live your life?</li>
                <li>What did your Letter Friend think was positive about their country?</li>
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


const StepTwo = () => {
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

const StepFour = () => {
    return (
        <div>
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


const Letter2 = ({ letterURLs, classRole }) => {
    const letterURL = letterURLs && letterURLs.letter2;
    return (
        <div>
            <OverviewTable content={tableContent} />
            <hr style={{margin: '20px 0'}}/>
            { specialContent[ classRole ]()}
            <div className='div-centered-content'>
                <button className='roll-button'>
                    <a href={letterURL} target='_blank'>
                    <Icon name='download'/>Download Letter 2 Template</a>
                </button>
            </div>
            <hr style={{margin: '20px 0'}}/>
            { classRole === 'sender' ? <StepOneSender /> : <StepOneReceiver /> }
            <hr style={{margin: '20px 0'}}/>
            <StepTwo />
            <hr style={{margin: '20px 0'}}/>
            <StepThree />
            <hr style={{margin: '20px 0'}}/>
            <StepFour />
        </div>
    );
}


export default Letter2;
