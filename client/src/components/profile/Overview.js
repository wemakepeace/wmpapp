import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import SelectClass from '../SelectClass';
import TeacherForm from './TeacherForm';
import { fetchClass, removeCurrentClass } from '../../redux/actions/class';
import { getCountryName } from '../../utils/helpers';

class Overview extends Component {
    state = {}

    initiateNewClass = () => {
        const newClass = true;
        this.props.removeCurrentClass();
        this.props.history.push('/profile/class');
    }


    shouldComponentUpdate(nextProps) {
        return nextProps.classes && nextProps.classes.currentClass ? true : false
    }

    render() {
        const { teacher, classes } = this.props;
        const { firstName, lastName, email, phone } = teacher;
        let showClass, country, school;

        if (classes && classes.list && classes.currentClass) {
            showClass = classes.list[classes.currentClass];
            school = showClass.school;
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
                    When you have filled in all the forms and are ready to find an exchange class to match with, please go to the EXCHANGE section.
                <div>
                    [PROGRESS BAR FOR EXCHANGE]
                </div>
                <div>
                    [NEXT STEPS]
                </div>
                <div>

                </div>
                <div>

                    {showClass !== undefined
                        ? <div>
                            <hr style={{margin: '30px 0'}}/>
                            <h3 style={{marginBottom: '18px'}}>Overview Class {showClass.name || null }</h3>
                        </div>
                        : null
                    }
                    <div className='div-display-inline-block'>
                        <div className='class-overview'>
                            <div className=''>
                                <label>Teacher</label>
                                <label>Email</label>
                                <label>Phone</label>
                            </div>
                            <div className=''>
                                <span>{firstName || null } {lastName || null }</span>
                                <span>{email || null }</span>
                                <span>{phone || null }</span>
                            </div>
                        </div>
                    </div>

                    {showClass !== undefined
                        ? <div className='div-display-inline-block'>
                            <div className='class-overview'>
                                <div className=''>
                                    <label>Class size</label>
                                    <label>Age group</label>
                                    <label>Registered for term</label>
                                </div>
                                <div className=''>
                                    <span>{showClass.size || null }</span>
                                    { showClass.age_group
                                        ? <span>{showClass.age_group.label || null }</span>
                                        : <span>Not defined yet.</span>
                                    }
                                    { showClass.term
                                        ? <span>{showClass.term.label || null }</span>
                                        : <span>Not defined yet.</span>
                                    }
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    {showClass && school && school.schoolName
                        ? <div className='div-display-inline-block'>
                            <div className='class-overview'>
                                <div className=''>
                                    <label>School Address</label>
                                </div>
                                <div className=''>
                                    <span>{school.schoolName || null}</span>
                                    <span>{school.address1 || null} {school.address2 || null}</span>
                                    <span>{school.zip || null} {school.city || null}</span>
                                    <span>{country || null}</span>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                    {showClass && showClass.exchange
                        ? <div className='div-display-inline-block'>
                            <div className='class-overview'>
                                <div className=''>
                                    <label>Exchange Progress</label>
                                </div>
                                <div className=''>
                                    <span>{showClass.exchange.status || null}</span>
                                </div>
                            </div>
                        </div>
                        : null
                    }
                </div>
                {showClass
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
                    : null
                }

                <hr style={{margin: '30px 0'}}/>
                <div className='container-center-content'>
                    <Button
                        onClick={this.initiateNewClass}
                        size='massive'
                        className='add-class'>Register New Class</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { fetchClass, removeCurrentClass })(Overview);



