import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import SelectClass from '../SelectClass';
import { fetchClass } from '../../redux/actions/class';


const Overview = ({ teacher, classes }) => {

    const { firstName, lastName } = teacher;
    let currentClass;

    if (classes && classes.list && classes.currentClass) {
        currentClass = classes.list[classes.currentClass];
    }

    return (
        <div className='profile-form'>
            <div className='profile-segment'>
                <h3>{`Welcome, ${firstName}`}</h3>
                <SelectClass />
                <p>
                    <span>Teacher name: </span><span>{firstName + ' ' + lastName}</span>
                </p>
                {currentClass !== undefined
                    ? <div className='class-overview'>
                        <p><span>Class name: </span><span>{currentClass.name}</span></p>
                        <p><span>Class size: </span><span>{currentClass.size}</span></p>
                        <p><span>Age group: </span><span>{currentClass.age_group.name}</span></p>
                        <p><span>Registered for term: </span><span>{currentClass.term.name}</span></p>
                    </div>
                    : null }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { fetchClass })(Overview);
