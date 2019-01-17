import React from 'react';
import { Grid } from 'semantic-ui-react';
import ClassDetails from './ClassDetails';

const ExhangeDetails = ({ currentClass, teacher, exchange }) => {
    return (
        <div className='class-portal-tab'>
            <Grid colums={2}>
                <Grid.Column width={8} className='overview-class-details'>
                    <ClassDetails
                        classData={currentClass}
                        teacher={teacher}
                        title='Your Class '/>
                </Grid.Column>
                <Grid.Column width={8} className='overview-class-details'>
                    <ClassDetails
                        classData={exchange && exchange.exchangeClass}
                        teacher={exchange && exchange.exchangeClass && exchange.exchangeClass.teacher}
                        title='Exchange Class '/>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default ExhangeDetails;


