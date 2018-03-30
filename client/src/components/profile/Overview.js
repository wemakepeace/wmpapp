import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import { fetchClass } from '../../redux/actions/class';



class Overview extends Component  {
    state = {
        selectedClass: '',
        options: []
    }

    onClassSelect = (value) => {
        this.setState({ selectedClass: value });
        console.log('value', value)
        this.props.fetchClass(value)
        // make call to db to fetch the class
        // set currentClass to the selectedclass
    }

    componentDidMount() {
        const classes = this.props.teacher.classes;
        const options = classes.map(_class => {
            return {
                label: _class.name,
                value: _class.id
            }
        });
        this.setState({ options })
    }

    render() {
        const { selectedClass, options } = this.state;
        const { firstName, classes } = this.props.teacher;
        const value = selectedClass && selectedClass.value;

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}</h3>
                    <p>Select class</p>
                    <Select
                        name='form-field-name'
                        value={value}
                        onChange={this.onClassSelect}
                        options={options}
                    />
                    <p>We Make Peace offers a Peace Letter exchange program for students between age 10-12 years. This is an exciting chance for students to befriend a student from another country through letter exchanges.</p>

                    <p>It is our aim to promote friendships across borders, enhance literacy and acceptance of diversity, to activate empathy and increase awareness of peace as a strong ideal for young people to aspire to.</p>

                    <p>Over the years we have developed this program where students from different countries write letters with each other. Each student shares life experiences, art and learn from another student through three letters, all in the name of promoting friendship and non-violent communication. The Peace Letter program provides the participating students with a platform where they can express themselves freely while also learning about the life of a student from a different culture.</p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher
    }
}

export default connect(mapStateToProps, { fetchClass })(Overview);
