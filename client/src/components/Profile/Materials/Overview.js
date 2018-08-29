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

const Body = ({ letterURLs }) => {
    return (
        <div>
            <div className=''>
                <h4>BEFORE YOU START</h4>
                <p>
                    The following instructions are designed to guide you through the Peace Letters exchange process. It’s pretty simple. Please read and follow these basic steps below to make sure the process go smoothly. Please also take the time to implement the lesson plans, as they are a vital part of ensuring a valuable exchange experience for you and your students. You are meant to do each lesson, as you receive the letters from the other school (a part from the first round).
                </p>
                <h4>IMPORTANT INFORMATION</h4>
                <h5>Student names and pen pal names must be written on the letters</h5>
                <p>
                    The flow of the Exchange relies on you as a teacher making sure that the students always <b>write their own name and the name of their pen pal</b> (once assigned) on the letters. Please go through all of the letters before sending and make sure that names are written on the letters.
                </p>
                <h5>Class roles</h5>
                <p>
                    Both classes participating in the Exchange will be given a role, either as SENDER or RECEIVER. If your role is SENDER, then you will be the one to begin the Excange by writing and sendting Letter 1.
                    If your class' role is RECEIVER, you will await receiving each round of letters until you have received a letter from the other class, the SENDER.
                    The instructions for each letter writing will explain to you what you need to do based on the assigned role.
                </p>
                <h5>Assigning pen pals</h5>
                <p>
                    Students will be assigned a pen pal <b>once the RECEIVER class has received Letter 1</b> from the SENDER class. From that point and forward the pen pals assigned to the students will remain the same throughout the Exchange.
                </p>
                <h5>In case of different number of students in exchanging classes</h5>
                <p>
                    In the case that the classes are of different sizes, it will be necessary for the class who is the RECEIVER to either assign more than one pen pal to the some of the students or have some students write to the same pen pal. Any student who is assgined more than one pen pal will write one letter collectively to all of his or her pen pals. Please make sure both of the names of the pen pals are added in the "to" section of the letters if this is the case for any of your students.

                </p>
                <h4>CHECK LIST</h4>
                    <ul>
                        <li>
                            Before mailing the letters make sure you read/skim through the contents of the students’ letters to ensure there is no abusive or undesirable content
                        </li>
                        <li>
                            Make sure that all students have written their names on the letters, and for letter 2 and 3 also their pen pals name
                        </li>
                        <li>
                            Make sure you post the letters to the correct address using the right amount of postage required
                        </li>
                    </ul>
            </div>
        </div>
    );
}



const Overview = ({ letterURLs }) => {
    return (
        <div>
            <Body letterURLs={letterURLs} />
        </div>
    )
}


export default Overview;
