import React from 'react';
import { OverviewTable } from '../OverviewTable'
import Address from '../Address';
import {
    Header,
    Message,
    Button,
    Icon
} from 'semantic-ui-react';

const tableContent = {
    cell1: 'Blackboard, Letter templates, Each student brings a photo or picture of themselves to be included in their letters',
    cell2: 'Group discussion, dos and don’ts, listening, sharing, letter writing.',
    cell3: 'Empathy, positivity, love, acceptance, compassion, creativity, solution-based thinking, trouble-shooting, new skill, letter writing, processing new concepts, analytical skills.'
};

const getSpecialContent = (role) => {
    const content = {
        sender: () => {
            return (
                <p>Your class has the SENDER role in the Exchange.<br />
                This means that your class will start by writing and sending Letter 1 to the other class.<br />
                Once the other class receives Letter 1 from you, they will begin writing Letter 1 and these will be sent to your class.<br />
                It is important that the students write their own name clearly on every page in the Letter.</p>
            );
        },
        receiver: () => {
            return (
                <p>
                   Your class has the RECEIVER role in the Exchange.<br />
                   This means that your class will wait until you receive Letter 1 from the other class before you begin writing and sending Letter 1.<br />
                   It is important that the students write their own name and the name of their letter friend clearly in the Letter.<br />
                </p>
            );
        }
    }


    return (
        <div>
            <Message size='large' color='yellow'>
                <h3><Icon name='info' />Important Information</h3>
                {content[ role ]()}
            </Message>
        </div>
    );
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
                <li>There is always a sender and a receiver (in this case you and your Letter Friend)</li>
                <li>You always begin a letter by addressing the receiver. Either by writing “Hi..”
            “Hello...” or “Dear..”.</li>
                <li>Talk about what kinds of information you normally share in a letter.</li>
                <li>Who you are, your age, where you live, how you live, your family and your friends.</li>
                <li>What kinds of things do you want to share about your life?</li>
                <li>For instance what do you like to do? Do you have a hobby?</li>
                <li>What is your favorite foods, favorite subject in school and why.</li>
                <li>Never use rude words. Never judge and be abusive.</li>
                <li>Always ask questions and enquire to the receiver’s health and happiness.</li>
                <li>Respond to their questions.</li>
            </ol>
        </div>
    );
}


const StepTwoSender = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 2</Header.Content>
            </Header>
            <p>5-10 minutes</p>
            <h3>Questions for your letter friend</h3>
            <p>What questions do you want to ask your pen pal? And what do you want to share?</p>
            <h4>Discussion</h4>
            <p>What do we want to know about our Letter Friends and their lives? What do we want them to learn about us and our lives?</p>
            <p>How can you make sure they get to know you through the letters?</p>
            <p>Write ideas and thoughts on the blackboard, so the students can draw inspiration from that while writing their letters.</p>
        </div>
    );
}

const StepTwoReceiver = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 2</Header.Content>
            </Header>
            <h3>Reading Letter 1 from the other class</h3>
            <p>30-40 minutes</p>
            <div>
                <ul>
                    <li>Hand out the letters to the students.</li>
                    <li>The letters that are handed out will determine who will be the students' Letter Friends for the rest of the Exchange.</li>
                    <li>In the case that the classes are of different sizes, you will need to either assign two Letter Friends to some of the students or have some of your students write to the same Letter Friend. Any student who is assgined two Letter Friends will write one letter collectively to both of his or her Letter Friends. Please make sure both of the names of the Letter Friends are added in the "to" and "from" section of the letters if this is the case for any of your students.</li>
                    <li>If any students are sharing a Letter Friend, make sure they are sitting together while reading and writing the letters.</li>
                    <li>Let the students have some time to read their letters and ask questions. Then tell them to share thoughts from their letters with the rest of the class.</li>
                </ul>
            </div>
            <h3>Questions to the group</h3>
            <p>5-10 minutes</p>
            <ul>
                <li>What have you learned about your Letter Friend?</li>
                <li>Did anything surprise you?</li>
                <li>What are the similarities and what are the differences in how you live your life?</li>
                <li>What did your Letter Friend think was positive about their country?</li>
            </ul>
            <h3>Questions for your Letter Friend</h3>
            <p>5-10 minutes</p>
            <p>What questions do you want to ask your pen pal? And what do you want to share?</p>
            <h4>Discussion</h4>
            <p>What do we want to know about our Letter Friends and their lives? What do we want them to learn about us and our lives?</p>
            <p>How can you make sure they get to know you through the letters?</p>
            <p>Write ideas and thoughts on the blackboard, so the students can draw inspiration from that while writing their letters.</p>
        </div>
    );
}




const StepThree = () => {
    return (
        <div>
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


const StepFour = ({ exchangeClass }) => {
    const { school, teacher, name } = exchangeClass;
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 4</Header.Content>
            </Header>
            <h3>Mailing the letters</h3>
            <p>Before mailing the letters please make sure that all students have written their <b>own names</b> clearly on the letters.</p>
            <p>If your class role is RECEIVER, please make sure that the students also have written their <b>Letter Friend's name</b> clearly in the letters</p>
            <p>Make sure that each students' letter has been stapled or clipped together.</p>
            <p>Post the letters to the attention of the teacher and class at the school. If in doubt double-check with the teacher via email before posting the pack in the mail.</p>
            <Address classData={exchangeClass} />
        </div>
    );
}

const StepFive = () => {
    return (
        <div>
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 5</Header.Content>
            </Header>
            <h3>Wait to receive letters from the other class</h3>
            <p>Once the letters have been sent, you will need to wait until you have received new letters from the other class. This should happen within a month's time.</p>
            <p>While waiting you are encouraged to talk to the students about what they have learned about their Letter Friends and the country or place where they are from.</p>
            <p>Once you have received the letters, please continue to the instructions for the next letter writing.</p>
        </div>
    );
}

const Letter1 = ({ letterURLs, classRole, exchangeClass }) => {
    // letter1 is slightly different depending on classRole
    const letterURL = letterURLs && letterURLs.letter1[ classRole ];
    return (
        <div>
            <h1>Instructions for Letter 1</h1>
            <p>Download and print the letter template and follow the instructions below for writing and sending the first letter.</p>
            {getSpecialContent(classRole)}
            <div className='div-centered-content'>
                <a href={letterURL} target='_blank'>
                    <button className='roll-button'>
                        <Icon name='download'/>Download Letter 1 Template
                    </button>
                </a>
            </div>
            <OverviewTable content={tableContent} />
            <hr style={{margin: '20px 0'}}/>
            <StepOne />
            <hr style={{margin: '20px 0'}}/>
            { classRole === 'sender' ? <StepTwoSender /> : <StepTwoReceiver /> }
            <hr style={{margin: '20px 0'}}/>
            <StepThree />
            <hr style={{margin: '20px 0'}}/>
            <StepFour exchangeClass={exchangeClass} />
            <hr style={{margin: '20px 0'}}/>
            <StepFive />
        </div>
    );
}


export default Letter1;
