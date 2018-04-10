import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import SelectClass from '../SelectClass';
import TeacherForm from './TeacherForm';
import { fetchClass } from '../../redux/actions/class';


class TeacherInfo extends Component {



    render() {
        const { firstName, lastName } = this.props.teacher;
        const { classes } = this.props;
        let currentClass;

        if (classes && classes.list && classes.currentClass) {
            currentClass = classes.list[classes.currentClass];
        }


        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}</h3>
                </div>

                <TeacherForm />

                <h3 className='segment-title'>Select Class Or Register New Class</h3>
                <hr style={{margin: '30px 0'}}/>

                    <div className='segment-container'>
                        { this.props.teacher.classes
                            ?   <div className='segment-half'>
                                    <SelectClass />
                                </div>
                            : null
                        }
                        <div className={this.props.teacher.classes ? 'segment-half' : 'segment-full'}>
                            <Button
                                onClick={()=> console.log('click')}
                                size='massive'
                                className='add-class'>Register new class</Button>
                        </div>
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

export default connect(mapStateToProps, { fetchClass })(TeacherInfo);


                    // {currentClass !== undefined
                    //     ? <div className='class-overview'>
                    //         <p><span>Class name: </span><span>{currentClass.name}</span></p>
                    //         <p><span>Class size: </span><span>{currentClass.size}</span></p>
                    //         <p><span>Age group: </span><span>{currentClass.age_group.name}</span></p>
                    //         <p><span>Registered for term: </span><span>{currentClass.term.name}</span></p>
                    //     </div>
                    //     : null }
