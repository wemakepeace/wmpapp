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
