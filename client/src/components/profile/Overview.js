import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Segment } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import { fetchClass } from '../../redux/actions/class';


class Overview extends Component  {
    state = {
        selected: '',
        options: []
    }

    onClassSelect = (selected) => {
        this.setState({ selected });
        if (this.props.classes && this.props.classes.list[selected.value]) {
            return
        } else {
            this.props.fetchClass(selected.value);
        }
    }

    componentDidMount() {
        const classes = this.props.teacher.classes;
        const options = classes.map(_class => {
            return {
                label: _class.name,
                value: _class.id
            }
        });

        this.setState({ options });

        if(classes && this.props.classes.currentClass) {
            const selected = options.find(option => {
                return option.value === this.props.classes.currentClass
            });

            this.setState({ selected });
        }
    }

    render() {
        const { selected, options } = this.state;
        const { firstName, classes } = this.props.teacher;
        const value = selected && selected.value;

        return (
            <div className='profile-form'>
                <div className='profile-segment'>
                    <h3>{`Welcome, ${firstName}`}</h3>
                    <h5>Select a class</h5>
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
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { fetchClass })(Overview);
