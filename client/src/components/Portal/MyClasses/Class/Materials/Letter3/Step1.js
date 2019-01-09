import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const Step1 = ({ classRole }) => {
    const content = {
        sender: () => (
            <div>
                <h3>Reading the letters</h3>
                <p>30-40 minutes</p>
                <ul>
                    <li>You should now have received Letter 2 from the other class.</li>
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
        ),
        receiver: () => (
            <div>
                <h3>Reading the letters</h3>
                <p>30-40 minutes</p>
                <ul>
                    <li>You should now have received Letter 3 from the other class.</li>
                    <li>Hand out the letters to the students. Your students' names should be written on the front of the letters.</li>
                    <li>If any of your students are sharing a Letter Friend, make sure they are sitting together.</li>
                    <li>If any of your students have two Letter Friends, they should write one collective letter to both Letter Friends. Make sure these students write both of the Letter Friends' names in the letter.</li>
                    <li>Let the students have some time to read their letters and ask questions. Then tell them to share thoughts from their letters with the rest of the class.</li>
                </ul>
                <h4>Questions to the group</h4>
                <ul>
                    <li>What more have you learned about your Peace Friend?</li>
                    <li>What have you learned about their school?</li>
                    <li>Do you feel closer to your Peace Friend now that you have received a third letter?</li>
                    <li>What did your Peace Friend draw?</li>
                </ul>
            </div>
        )
    }

    return (
        <div>
            <hr style={{margin: '20px 0'}} />
            <Header as='h3'>
                <Header.Content><Icon name='content' />STEP 1</Header.Content>
            </Header>
            {content[ classRole ]()}
        </div>
    );
}


export default Step1;
