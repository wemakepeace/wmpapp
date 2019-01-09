import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Step1 = () => {
    return (
        <div>
            <hr style={{margin: '20px 0'}}/>
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

export default Step1;
