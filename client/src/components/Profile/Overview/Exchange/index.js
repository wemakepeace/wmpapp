import React, { Component } from 'react';
import { connect } from 'react-redux';
import Feedback from '../../../Feedback';
import ExchangeDetails from './ExchangeDetails';
import { ExchangeStatus } from './ExchangeStatus';
import { initiateExchange, verifyExchange } from '../../../../redux/actions/exchange';


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

    /*
     * An exchange can be in one of these four stages:
     * 1.   Not started
     * 2.   Initiated (no match has been found, waiting for another class to sign up that matches)
     * 3.   Pending (match has been made, but we are waiting for one or both classes to confirm exchange)
     * 4.   Confirmed (both classes has confirmed, ready to begin exchange)
     */

    onExchangeActionClick(exchangeAction) {
        const { currentClass: { id } } = this.props;
        const { exchange, toggleLoader } = this.props;
        const exchangeId = exchange && exchange.id;
        // toggleLoader will submit action based on current exchange status
        // either intiateExchange or verifyExchange
        toggleLoader(true, exchangeAction);
        return this.props[ exchangeAction ](id, exchangeId);
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback && feedback.type === 'error') {
            this.setState({ showFeedback: true });
        }
    }

    render() {
        const {
            feedback,
            exchange,
            currentClass
        } = this.props;
        const { showFeedback } = this.state;

        if (!currentClass || !currentClass.id) {
            return null;
        }

        return (
            <div>
                <hr style={{margin: '20px 0'}} />
                <h3 style={{margin: '30px 0'}}>Exchange Details</h3>
                <ExchangeDetails classData={currentClass} />
                <ExchangeStatus
                    onExchangeActionClick={this.onExchangeActionClick.bind(this)}
                    status={exchange && exchange.status}
                    classIsVerified={exchange.classIsVerified}
                />
                { showFeedback && (feedback && feedback.type) ?
                    <Feedback {...feedback} /> : null }
            </div>
        );
    };
};

const mapStateToProps = ({ currentClass, feedback, exchange }) => {
    return {
        currentClass,
        feedback,
        exchange
    };
};

export default connect(mapStateToProps, { initiateExchange, verifyExchange })(Exchange);
