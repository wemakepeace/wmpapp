import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Progress } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import SelectClass from '../SelectClass';
import Feedback from '../Feedback';
import ExchangeDetails from './ExchangeDetails';
import ClassDetails from './ClassDetails';

import { initiateExchange, verifyExchange } from '../../redux/actions/exchange';
import { getCountryName } from '../../utils/helpers';

class Exchange extends Component {
    state = {
        percent: 20,
        showFeedback: false
    }

    initiate = (id) => {
        return this.props.initiateExchange(id)
    }

    onActionClick = (action) => {
        const classId = this.props.classes.currentClass;
        const exchangeId = this.props.exchange && this.props.exchange.id;
        return this.props[action](classId, exchangeId);
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback && feedback.type === 'error') {
            this.setState({ showFeedback: true });
        }
    }

    classIsVerified = () => {
        if (!this.props.exchange || !this.props.exchange.status) {
            return false
        }

        const classId = this.props.classes.currentClass;
        const { classAId, classBId, classAVerified, classBVerified } = this.props.exchange;
        if ((classId === classAId) && classAVerified) {
            return true
        }

        if ((classId === classBId) && classBVerified) {
            return true
        }

        return false
    }

    render() {
        const {
            teacher,
            classes,
            feedback,
            exchange,
            verifyExchange } = this.props;
        const { showFeedback } = this.state;
        const status = exchange && exchange.status ? exchange.status : null;
        const { firstName, lastName, email, phone } = teacher;
        let _class, country, school, matchClass, matchTeacher;

        if (exchange && exchange.classRole && exchange.classA && exchange.classB) {
            matchClass = exchange.classRole === 'A' ? exchange.classB : exchange.classA;
            matchTeacher = exchange.classRole === 'A' ? exchange.classB.teacher : exchange.classA.teacher;
        }

        if (classes && classes.list && classes.currentClass) {
            _class = classes.list[classes.currentClass];
            school = _class.school;
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
                    <h3>Exchange Details</h3>

                    <p>When you have filled in all the information, click the button to initiate an exchange.</p>
                    <p>When a match has been made you will receive an email and you will be able to see more information about the exchange on this page.</p>
                </div>
                <ExchangeDetails
                    status={status}
                    onActionClick={this.onActionClick}
                    classIsVerified={this.classIsVerified()}
                    serverFeedback={feedback.messages[0]} />
                <ClassDetails
                    classData={matchClass}
                    teacherData={matchTeacher}
                    title='Exchange Class Details Class ' />
                 { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes,
        feedback: state.feedback,
        exchange: state.exchange
    }
}

export default connect(mapStateToProps, { initiateExchange, verifyExchange })(Exchange);



