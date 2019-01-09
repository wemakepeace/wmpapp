import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

const ImportantMessage = ({ classRole }) => {
    const content = {
        sender: () => (
            <p>
                Your class has the SENDER role in the Exchange.<br />
                If you have received Letter 1 from the other class you are ready to begin writing Letter 2.<br />
                Once the other class receives Letter 2 from you, they will begin writing Letter 2 and these will be sent to your class. <br />
                It is important that the students write their own name and the name of their letter friend clearly on every page in the Letter.<br />
            </p>
        ),
        receiver: () => (
            <p>
                Your class has the RECEIVER role in the Exchange.<br />
                This means that your class will wait until you receive Letter 2 from the other class before you begin writing Letter 2.<br />
                It is important that the students write their own name and the name of their letter friend clearly in the Letter.<br />
            </p>
        )
    }

    return (
        <Message size='large' color='yellow'>
            <h3><Icon name='info' />Important Information</h3>
            {content[ classRole ]()}
        </Message>
    );
}

export default ImportantMessage;
