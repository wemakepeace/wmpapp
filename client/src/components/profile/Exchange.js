import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Progress } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import SelectClass from '../SelectClass';
import Feedback from '../Feedback';
import ExchangeDetails from './ExchangeDetails';

import { initiateExchange } from '../../redux/actions/exchange';
import { getCountryName } from '../../utils/helpers';

const ProgressBar = ({ percent }) => (
    <div>
        <Progress percent={percent} indicating={false} />
        <div className='progress profile-segment'>
            <span>Create Profile</span>
            <span>Find Match</span>
            <span>Send Letter 1</span>
            <span>Send Letter 2</span>
            <span>Send Letter 3</span>
        </div>
    </div>
)


class Exchange extends Component {
    state = {
        percent: 20,
        showFeedback: true
    }

    onStartExchangeClick = (id) => {
        this.props.initiateExchange(id)
    }

    render() {
        const { teacher, classes, feedback, exchange } = this.props;
        const { firstName, lastName, email, phone } = teacher;
        let _class, country, school;
        const { showFeedback } = this.state;

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
                <div className='profile-segment'>
                    {/*<ProgressBar percent={this.state.percent}/>*/}
                </div>
                { exchange && exchange.status
                ? <ExchangeDetails exchange={exchange} />
                : <div className='profile-segment'>
                    <div className='container-center-content'>
                        <p>By clicking START EXCHANGE your class will be signed up to participate in the Peace Letter program.
                        </p>
                        <Button
                            onClick={() => this.onStartExchangeClick(_class.id)}
                            size='massive'
                            className='add-class'>START EXCHANGE</Button>
                    </div>
                </div>}
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

export default connect(mapStateToProps, { initiateExchange })(Exchange);



