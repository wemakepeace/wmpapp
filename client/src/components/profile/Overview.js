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

        if (this.props.classes && this.props.classes.list && this.props.classes.list[selected.value]) {
            this.props.fetchClass(selected.value, false)
        } else {
            this.props.fetchClass(selected.value, true);
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
        const { firstName, lastName, classes } = this.props.teacher;
        let currentClass;

        if (this.props.classes && this.props.classes.list && this.props.classes.currentClass) {
            currentClass = this.props.classes.list[this.props.classes.currentClass];
        }
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
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps, { fetchClass })(Overview);
