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
    cell1: 'Blackboard, WMP templates, Each student brings a photo or picture of themselves to be included in their letters',
    cell2: 'Group discussion, dos and don’ts, listening, sharing, letter writing.',
    cell3: 'Empathy, positivism, love, acceptance, compassion, creativity, solution-based thinking, trouble-shooting, new skill, letter writing, processing new concepts, analytical skills.'
};

const specialContent = {
    sender: () => {
        return (
            <div>
                <p>Your class has the SENDER role in the Exchange. This means that your class will start by writing and sending Letter 1 to the other class. Once the other class receives Letter 1 from you, they will begin writing Letter 1 and these will be sent to your class.
                </p>
                <h4>Steps</h4>
                <ul>
                    <li>Step 1 - Lesson: Letter writing ss a genre</li>
                    <li>Step 2 - Lesson: Questions for your letter friend</li>
                    <li>Step 3 - Writing the letters</li>
                    <li>Step 4 - Mailing the letters</li>
                    <li>Step 5 - Wait to receive Letter 1 from the other class</li>
                </ul>
            </div>
        )
    },
    receiver: () => {
        return (
            <div>
                This is content specially written for RECEIVER
            </div>
        )
    }
}

const StepOne = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 1</Header.Content>
            </Header>
            <h3>Letter writing as a genre</h3>
            <p>20 minutes</p>
            <p>Begin by sharing some facts about the genre of letter writing.</p>
            <h4>Why we write letters</h4>
            <p>In the old days people used to send each other letters as their way of communicating. This was before the telephone, emails and text messages. </p>
            <p>Letter writing is more formal than writing an email or sending a text message. Especially when you are writing to someone you have never met. Letters are normally more polite and longer than emails. Make sure you write full sentences, and try to image the person receiving your letter.</p>

            <h4>What is the structure of writing a letter?</h4>
            <ol>
                <li>There is always a sender and a receiver (in this case you and your peace-friend)</li>
                <li>You always begin a letter by addressing the receiver. Either by writing “Hi..”
            “Hello...” or “Dear..”.</li>
                <li>Talk about what kinds of information you normally share in a letter.</li>
                <li>Who you are, a boy or a girl, your age, where you live, how you live.</li>
                <li>What kinds of things do you want to share about your life?</li>
                <li>For instance what do you like to do? Do you have a hobby?</li>
                <li>What is your favorite foods, favorite subject in school and why.</li>
                <li>Never swear or use rude words. Never judge and be abusive.</li>
                <li>Always ask questions and enquire to the receiver’s health and happiness.</li>
                <li>Respond to their questions.</li>
            </ol>
        </div>
    );
}


const StepTwo = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 2</Header.Content>
            </Header>
            <p>5-10 minutes</p>
            <h3>Questions for your letter friend</h3>
            <p>What questions do you want to ask your pen pal? And what do you want to share?</p>
            <h4>Discussion</h4>
            <p>What do we want to know about our peace-friends and their lives? What do we want them to learn about us and our lives?</p>
            <p>How can you make sure they get to know you through the letters?</p>
            <p>Write ideas and thoughts on the blackboard, so the students can draw inspiration from that while writing their letters.</p>
        </div>
    );
}


const StepThree = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 3!!!</Header.Content>
            </Header>
            <h3>Writing the letters</h3>
            <p> 1 hour</p>
            <ul>
                <li>Print and hand out the Letter 1 Templates to all students.</li>
                <li>Ask the students to bring a photo of themselves to add to the letter.</li>
                <li>Letter 1 focuses <em>Positivity</em>.</li>
            </ul>
            <p>The first part of the letter exchange is an introduction of themselves as well as a focus on how we can use Positivity to make peace in our daily lives. Make sure you encourage the students to write full sentences.</p>
            <p>Make sure all the students write their names clairly on the letters. If any students have identical names, make sure they include middle names or initials as well.</p>
        </div>
    );
}


const StepFour = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 4</Header.Content>
            </Header>
            <h3>Mailing the letters</h3>
            <p>Before mailing the letters please make sure that all students have written their names clearly on the letters.</p>
            <p>Post the letters to the attention of the teacher at the school and address listed on the Exchange Overview page. If in doubt double-check with the teacher via email before posting the pack in the mail.</p>
        </div>
    );
}

const StepFive = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 5</Header.Content>
            </Header>
            <h3>Wait to receive Letter 1 from the other class</h3>
            <p>Once the letters have been sent, you will need to wait until you have received the Letter 1 from the other class. This should happen within a month's time.</p>
            <p>While waiting you are encouraged to talk to the students about the country or place where the other class is from.</p>
            <p>Once you have received the letters, please continue to the instructions for Letter 2.</p>
        </div>
    );
}

const Letter1 = ({ letterURLs, classRole }) => {
    return (
        <div>
            <OverviewTable content={tableContent} />
            <hr style={{margin: '20px 0'}}/>
            { specialContent[ classRole ]()}
            <span><Icon name='download' /><a href={letterURLs && letterURLs[0]} target='_blank'>Download Letter 1 Template</a></span>
            <hr style={{margin: '20px 0'}}/>
            <StepOne />
            <hr style={{margin: '20px 0'}}/>
            <StepTwo />
            <hr style={{margin: '20px 0'}}/>
            <StepThree />
            <hr style={{margin: '20px 0'}}/>
            <StepFour />
            <hr style={{margin: '20px 0'}}/>
            <StepFive />
        </div>
    );
}


export default Letter1;
