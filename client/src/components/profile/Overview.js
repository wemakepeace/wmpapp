import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import SelectClass from '../SelectClass';
import { fetchClass } from '../../redux/actions/class';


class Overview extends Component {



    render() {
        const { firstName, lastName } = this.props.teacher;
        const { classes } = this.props;
        let currentClass;

        if (classes && classes.list && classes.currentClass) {
            currentClass = classes.list[classes.currentClass];
        }


        console.log('this.props.onViewChange', this.props.onViewChange)

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}</h3>
                    { this.props.teacher.classes
                        ? <SelectClass />
                        : <div>
                            Go to <span className='link' onClick={() => this.props.onViewChange('profile')}>Profile & Settings</span> to register your class for a letter exchange.
                        </div>
                    }
                </div>
                <Button onClick={()=> console.log('click')}>Register new class</Button>
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

export default connect(mapStateToProps, { fetchClass })(Overview);


                    // {currentClass !== undefined
                    //     ? <div className='class-overview'>
                    //         <p><span>Class name: </span><span>{currentClass.name}</span></p>
                    //         <p><span>Class size: </span><span>{currentClass.size}</span></p>
                    //         <p><span>Age group: </span><span>{currentClass.age_group.name}</span></p>
                    //         <p><span>Registered for term: </span><span>{currentClass.term.name}</span></p>
                    //     </div>
                    //     : null }
