import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import SelectClass from '../SelectClass';
import TeacherForm from './TeacherForm';
import ClassDetails from './ClassDetails';

import { fetchClass } from '../../redux/actions/class';
import { getCountryName } from '../../utils/helpers';

class Overview extends Component {
    state = {}

    shouldComponentUpdate(nextProps) {
        return nextProps.classes && nextProps.classes.currentClass ? true : false
    }

    render() {
        const { teacher, classes, exchange } = this.props;
        const { firstName, lastName, email, phone } = teacher;
        let classData, country, school;

        if (classes && classes.list && classes.currentClass) {
            classData = classes.list[classes.currentClass];
            school = classData.school;
        }

        if (this.props.classes && this.props.classes.list) {
            const countryCode = this.props.classes.list[this.props.classes.currentClass].school.country;
            if (countryCode) {
                country =  getCountryName(countryCode);
            }
        }

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}!</h3>
                    <p>Here you can edit your teacher profile, register a new class and manage all your enrolled classes.</p>
                    <p>Select an existing class in the top right corner or register a new class. Use the left side menu to navigate the portal.</p>
                    <p>Once a class has been matched you will be able to communicate with the other class' teacher through Messages.</p>
                </div>
                <div>
                    <div>
                        When you have filled in all the forms and are ready to find an exchange class to match with, please go to the EXCHANGE section.
                    </div>

                    <ClassDetails classData={classData} teacherData={teacher} />

                    { classData && (exchange && exchange.status)
                        ? <div className='div-display-inline-block'>
                            <div className='class-overview'>
                                <div className=''>
                                    <label>Exchange Progress</label>
                                </div>
                                <div className=''>
                                    <span>{exchange.status || null}</span>
                                </div>
                            </div>
                        </div>
                        : null }
                </div>
                { classData
                    ?<div>
                        <hr style={{margin: '30px 0'}} />
                        <div className='profile-segment'>
                            <h3>Next Steps</h3>
                            <h5>Awaiting: _____</h5>

                            <div className='container-center-content'>
                                <div style={{margin: 'auto'}} className='steps'>
                                    <div className='step-list'>
                                        <ul>
                                            <li><Icon name='checkmark' />Complete Techer Profile</li>
                                            <li><Icon name='checkmark' />Complete Class Profile</li>
                                            <li><Icon name='checkmark' />Initiate Exchange</li>
                                        </ul>
                                    </div>
                                    <div className='step-list'>
                                        <ul>
                                            <li><Icon name='checkmark' />Write and Send Letter 1</li>
                                            <li><Icon name='checkmark' />Write and Send Letter 2</li>
                                            <li><Icon name='' />Write and Send Letter 3</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null}
                <hr style={{margin: '30px 0'}}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes,
        exchange: state.exchange
    }
}

export default connect(mapStateToProps, { fetchClass })(Overview);



