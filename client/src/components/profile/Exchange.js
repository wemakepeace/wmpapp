import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Progress } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import SelectClass from '../SelectClass';

import { initiateExchange } from '../../redux/actions/exchange';
import { getCountryName } from '../../utils/helpers';

const exchangeDetails = {
    initiated: "Your class is signed up to participate in the Peace Letter Exchange Program, and we are currently searching for a class to match with. Look out for an email and make sure to confirm the Exchange particpation once you receive the email"
}

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
        percent: 20
    }

    onStartExchangeClick = (id) => {
        console.log('id', id)
        this.props.initiateExchange(id)
        // dispatch action
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
                    <h3>Exchange Details</h3>

                    <p>When you have filled in all the information, click the button to initiate an exchange.</p>
                    <p>When a match has been made you will receive an email and you will be able to see more information about the exchange on this page.</p>
                </div>
                <div className='profile-segment'>
                    <ProgressBar percent={this.state.percent}/>
                </div>
                { /*showClass.exchange*/
                    false
                ? <div className='profile-segment'>
                    <div className=''>
                        <h5 style={{ display: 'inline-block', marginRight: '20px'}}>Exchange Status</h5>
                        <span>{showClass.exchange.status || null}</span>
                    </div>
                    <div>
                        {exchangeDetails[showClass.exchange.status]}
                    </div>
                    <div>Details about current status. Pending means that you have initiated an exchange. If a match is found you will receive an email and you will need to login here to confirm the exchange within 7 days of receiving the email. Once the teachers for both of the exchanging classes have confirmed their classses participation, you will be ready to start the exchange.
                    </div>
                </div>
                : <div className='profile-segment'>
                    <div className='container-center-content'>
                        <p>By clicking START EXCHANGE your class will be signed up to participate in the Peace Letter program.
                        </p>
                        <Button
                            onClick={() => this.onStartExchangeClick(showClass.id)}
                            size='massive'
                            className='add-class'>START EXCHANGE</Button>
                    </div>
                </div>}
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

export default connect(mapStateToProps, { initiateExchange })(Exchange);



