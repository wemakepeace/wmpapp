import React from 'react';

const Instructions = ({ letterURLs, ...props }) => {
    return (
        <div>
            <h4>ABOUT THE PEACE LETTER PROGRAM</h4>
            <p>
                Thank you for signing your class up to participate in the Peace Letter Program! We hope you and your students will share meaningful experiences with your Peace Letter exchange class.
            </p>
            <p>
                The following instructions are designed to guide you through the Peace Letter exchange process. It’s pretty simple. Please read and follow these basic steps below to make sure the process go smoothly.
            </p>
            <p>
                The program consists of three rounds of letters. Each of the letters will discuss different topics and there are lessons that you as the teacher will go through.
                Please take the time to implement the lesson plans, as they are a vital part of ensuring a valuable exchange experience for you and your students.
                On this page you will find both the letter templates and the instructions for each of the letters. Please make sure you read the instructions for each letter carefully.
            </p>
            <h4>IMPORTANT INFORMATION</h4>
            <h5 className='underline'>Class roles</h5>
            <p>
                Both classes participating in the Exchange will be given a role, either as <b>SENDER</b> or <b>RECEIVER</b>. If your role is SENDER, then your class will begin the Excange by writing and sendting Letter 1.
                If your class' role is RECEIVER, you will await writing each round of letters until you have received letters from the other class.
                The instructions for each of the three letters will explain to you what you need to do based on the assigned role.
            </p>
            <h5 className='underline'>Assigning a Letter Friend for each student</h5>
            <p>
                Students will be assigned a Letter Friend once the RECEIVER class has received Letter 1 from the SENDER class. From that point and forward the Letter Friends assigned to the students will remain the same throughout the Exchange.
            </p>
            <h5 className='underline'>In case of different number of students in the classes</h5>
            <p>
                In the case that the classes are of different sizes, it will be necessary for the the teacher of the class who is the RECEIVER to either assign two Letter Friends to some of the students or have some students write to the same Letter Friend.
            </p>
            <p>
                Any student who is assgined two Letter Friends will write one letter collectively to both of his or her Letter Friends. Please make sure both of the names of the Letter Friends are added in the "to" and "from" section of the letters if this is the case for any of your students.
            </p>
            <p>
                Any students who are writing to the same Letter Friend will both be writing individual letters to the Letter Friend.
            </p>
            <h5 className='underline'>In case a students drops of out the Exchange</h5>
            <p>
                If for any reason a students is no longer able to participate in the program, please make sure to notify the other teacher. In this case the two of you should agree on a solution. We recommend assigning the student who no longer has a Letter Friend to another student who will now have to Letter Friends to write with.
            </p>
            <h5 className='underline'>Student names and Letter Friend names must be written on the letters</h5>
            <p>
                The flow of the Exchange relies on you as a teacher making sure that the students always write their <b>own name</b> and the name of their <b>Letter Friend</b> (once assigned) in the letters. Please go through all of the letters before sending them to make sure that no letters are sent unsigned.
            </p>
            <h4>CHECK LIST</h4>
                <ul>
                    <li>
                        Before mailing the letters make sure you read/skim through the contents of the students’ letters to ensure there is no abusive or undesirable content.
                    </li>
                    <li>
                        Make sure that all students have written their names on the letters, and for letter 2 and 3 also their Letter Friend's name
                    </li>
                    <li>
                        Make sure you mail the letters to the correct address using the right amount of postage required
                    </li>
                </ul>
        </div>
    );
};


export default Instructions;
