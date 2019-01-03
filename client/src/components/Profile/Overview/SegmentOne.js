import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';

export const SegmentOne = ({ firstName, showSegmentOne, toggleSegmentOne }) => {
    return (
        <div className='profile-segment'>
            <h2>{`Welcome, ${firstName}`}!</h2>
            <p>Here you can create or edit your teacher profile, manage all your enrolled classes or register a new class.</p>
            <Accordion>
                <Accordion.Title
                    active={showSegmentOne}
                    index={0}
                    onClick={toggleSegmentOne}>
                <Icon name='dropdown' />
                How the program works
                </Accordion.Title>
                <Accordion.Content active={showSegmentOne}>
                <div>
                    <h3>About the program</h3>
                        <p>We Make Peace offers a Peace Letter exchange program for students between age 8-13 years. This is an exciting chance for students to befriend a student from another country through letter exchanges.</p>
                        <p>It is our aim to promote friendships across borders, enhance literacy and acceptance of diversity, to activate empathy and increase awareness of peace as a strong ideal for young people to aspire to.</p>
                        <p>Over the last seven years this program has allowed students from different countries to write letters to each other. Each student shares life experiences, art and learns from another student through three letters, all in the name of promoting friendship and non-violent communication. The Peace Letter program provides the participating students with a platform where they can express themselves freely while also learning about the life of a student from a different culture. And it is also meaningful for the teachers who are helping facilitate the exchange.</p>
                        <h3>How it works</h3>
                        <p>The program consists of three letters that the students will write with their letter friend. The students will use a printed letter template to write the letters, in which they will be discussing and sharing their thoughts on topics relating to Positivity, Empathy, Acceptance, Compassion, and Equality. They will also be able to make drawings for each other.</p>
                        <p>As a teacher, you will follow the Program Instructions. Each of the three letter writing sessions will have specific lessons that tackle the topics the students will be writing about. The topics are sometimes abstract and for young minds it is valuable to be able to discuss with you and other students.</p>
                        <p>The program is meant for students between the ages of 8 to 10 and 11 to 13 years.</p>
                        <p>To get started, register your class and follow the instructions</p>
                        <p>Please make sure you initiate the exchange. If there is a class already registered that matches with yours, both you and the other teacher will need to confirm the participation within 7 days.</p>
                        <p>If there is not currently a class registered that matches your class, you will be notified via email once there is an exchange match. Please be on the lookout for an email. Once a match is made, you must confirm the participation within 7 days.</p>
                        <p>Once an exchange match has been made, and both classes have confirmed their participation, you are ready to begin the Peace Letter Exchange Program. At this point you will have the name and email address of the other class’ teacher and be able to connect with each other.</p>
                        <p>As a teacher you can manage multiple classes through the same portal profile.</p>
                        <h3>Cost of participation</h3>
                        <p>The program is FREE to use. However, the cost of printing and postage must be covered by the participating class.</p>
                        <p>We realize that many teachers are not given sufficient resources as it is, so we are working on developing a Sponsorship option for classes that need financial support in order to participate.</p>
                </div>
                </Accordion.Content>
            </Accordion>
        </div>

    );
}
