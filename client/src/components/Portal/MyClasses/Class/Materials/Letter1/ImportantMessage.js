import React from 'react';
import OverviewTable from '../OverviewTable'
import { Message, Icon } from 'semantic-ui-react';

const ImportantMessage = ({ classRole }) => {
    const content = {
        sender: () => (
            <p>Your class has the SENDER role in the Exchange.<br />
            This means that your class will start by writing and sending Letter 1 to the other class.<br />
            Once the other class receives Letter 1 from you, they will begin writing Letter 1 and these will be sent to your class.<br />
            It is important that the students write their own name clearly on every page in the Letter.</p>
        ),
        receiver: () => (
            <p>
               Your class has the RECEIVER role in the Exchange.<br />
               This means that your class will wait until you receive Letter 1 from the other class before you begin writing and sending Letter 1.<br />
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
