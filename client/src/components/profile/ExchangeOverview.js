import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Progress } from 'semantic-ui-react'
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import SelectClass from '../SelectClass';
import Feedback from '../Feedback';
import ExchangeDetails from './ExchangeDetails';
import ClassDetails from './ClassDetails';
import { initiateExchange, verifyExchange } from '../../redux/actions/exchange';
import { getCountryName } from '../../utils/helpers';

class Exchange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 20,
            showFeedback: false
        }
    }

    initiate(id) {
        return this.props.initiateExchange(id);
    }

    onExchangeActionClick(exchangeAction) {
        const { currentClass } = this.props.classes;
        const { exchange, toggleLoader } = this.props;
        const exchangeId = exchange && exchange.id;

        toggleLoader(true, exchangeAction);
        return this.props[ exchangeAction ](currentClass, exchangeId);
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback && feedback.type === 'error') {
            this.setState({ showFeedback: true });
        }
    }


    render() {
        const {
            teacher,
            classes,
            feedback,
            exchange,
            verifyExchange } = this.props;
        const { showFeedback } = this.state;
        const status = exchange && exchange.status || null;
        let classData;


        if (classes && classes.list && classes.currentClass) {
            classData = classes.list[ classes.currentClass ];
        }

        //
        return (
            <div>
                <h1 style={{margin: '30px 0'}}>Exchange Details</h1>
                <ExchangeDetails
                    classData={classData}
                    status={status}
                    onExchangeActionClick={this.onExchangeActionClick.bind(this)}
                    classIsVerified={exchange.classIsVerified}
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



