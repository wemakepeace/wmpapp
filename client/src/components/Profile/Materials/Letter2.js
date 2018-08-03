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

const StepOne = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 1</Header.Content>
            </Header>
            <h5>Reading the letters</h5>
            <p>30-40 minutes</p>
            <ul>
                <li>[TO BE UPDATED]Hand out the individual letters to the students referring to the matched list on the Student Information Sheet.</li>
                <li>Let the students have some time to read their letters and ask questions. Then tell them to share thoughts and quotes from their letters with the rest of the class.</li>
            </ul>
            <h4>Questions to the group</h4>
            <ul>
                <li>What have you learned about your Peace Friend?</li>
                <li>Did anything surprise you?</li>
                <li>What are the similarities and what are the differences in how you live your life?</li>
                <li>What did your Peace Friend think was positive about their country?</li>
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
                <li>Hand out Letter 2 templates to the students.</li>
                <li>Letter 2 focuses on <em>Empathy</em> and <em>Acceptance</em>.</li>
            </ul>

            <h5>Discussion</h5>
            <p><em>Empathy</em></p>
            <p>Close your eyes. Imagine that you have swapped lives with your Peace Friend. How would your home be? Your school? What games would you play? How would you feel?</p>
            <p><em>Acceptance</em></p>
            <p>Why should we not accept bullying? Why is it better to accept each other the way we are?</p>
            <p>Give the students time to write a reply. They can also take the templates home and finish the second letter as homework. Make sure you encourage the students to write full sentences.</p>
            <p>[TO BE UPDATED]When you have collected all the letters from the students you are ready to mail them following the same instructions as last time.</p>
        </div>
    );
}


const StepThree = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 3</Header.Content>
            </Header>
            <h5>Mailing the letters</h5>
            <p>Before mailing the letters please make sure you</p>
            <ol>
                <li>[TO BE CHANGED]Fill in the Student Information Sheet providing a numbered list of the students and make sure the letters are numbered according to the list.</li>

                <li>Post the letters to the attention of the teacher at the school and address listed on the Exchange Overview page. If in doubt double-check with the teacher via email before posting the pack in the mail.</li>
                <li>Wait for the next letter from the exchange class to arrive in the mail. This should happen within a month's time.</li>
            </ol>
        </div>
    );
}


const Letter2 = ({ letterURLs }) => {
    return (
        <div>
            <OverviewTable content={tableContent} />
            <span><Icon name='download' /><a href={letterURLs && letterURLs[1]} target='_blank'>Download Letter 2 Template</a></span>
            <hr style={{margin: '20px 0'}}/>
            <StepOne />
            <hr style={{margin: '20px 0'}}/>
            <StepTwo />
            <hr style={{margin: '20px 0'}}/>
            <StepThree />
        </div>
    );
}


export default Letter2;
