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
        this.props.toggleLoader(true, action);
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
        let classData, country, school, matchClass, matchTeacher;

        if (exchange && exchange.classRole && exchange.classA && exchange.classB) {
            matchClass = exchange.classRole === 'A' ? exchange.classB : exchange.classA;
            matchTeacher = exchange.classRole === 'A' ? exchange.classB.teacher : exchange.classA.teacher;
        }

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
            <div>
                <h1 style={{margin: '30px 0'}}>Exchange Details</h1>
                <ClassDetails
                    classData={matchClass}
                    teacherData={matchTeacher}
                    title='Exchange Class ' />
                <ExchangeDetails
                    classData={classData}
                    status={status}
                    onActionClick={this.onActionClick}
                    classIsVerified={this.classIsVerified()}
                    serverFeedback={feedback.messages[0]} />
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



