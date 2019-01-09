import React from 'react';
import { Header, Icon } from 'semantic-ui-react';


const Step2Sender = () => {
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

const Step2Receiver = () => {
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


export { Step2Sender, Step2Receiver };
