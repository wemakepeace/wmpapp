import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Grid, Image, Accordion, Icon } from 'semantic-ui-react';
import ExchangeProgress from './ExchangeProgress';
import ClassDetails from './ClassDetails';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import SelectClass from '../../reusables/SelectClassDropdown';
import RegisterClass from '../../reusables/RegisterClass';


const Progress = ({ currentClass, teacher, exchange, toggleLoader }) => {
    return (
        <div className='class-portal-tab'>
            <ExchangeProgress toggleLoader={toggleLoader} />
            <hr style={{margin: '20px 0'}} />
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

export default Progress;
