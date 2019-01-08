import React from 'react';
import { connect } from 'react-redux';
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
                        classData={exchange.exchangeClass}
                        teacher={exchange.exchangeClass && exchange.exchangeClass.teacher}
                        title='Exchange Class '/>
                </Grid.Column>
            </Grid>
        </div>
    );
}

const mapStateToProps = ({ currentClass }) => {
    return { currentClass }
}
export default connect(mapStateToProps)(ExhangeDetails);

