import React, { Component } from 'react';
import { connect } from 'react-redux';
import Feedback from '../../../../Feedback';
import { Status } from './Status';
import { initiateExchange, verifyExchange } from '../../../../../redux/actions/exchange';
import { LoaderWithText } from '../../../../reusables/LoaderWithText';
import GoogleMap from './GoogleMap';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent: 20,
            showFeedback: false,
            loading: false,
            action: '',
            exchangeActions:{
                initiateExchange: 'Initiating Exchange',
                verifyExchange: 'Confirming Your Exchange Participation'
            }
        }
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback && feedback.type === 'error') {
            this.setState({ showFeedback: true });
        }
        this.setState({ loading: false})

    }

    toggleLoader(bool, action) {
        if (bool !== undefined) {
            this.setState({ loading: bool, action });
        } else {
            this.setState({ loading: !this.state.loading, action });
        }
    }

    /*
     * An exchange can be in one of these four stages:
     * 1.   Not started
     * 2.   Initiated (no match has been found, waiting for another class to sign up that matches)
     * 3.   Pending (match has been made, but we are waiting for one or both classes to confirm exchange)
     * 4.   Confirmed (both classes has confirmed, ready to begin exchange)
     */

    onExchangeActionClick(exchangeAction) {
        const { currentClass: { id }, exchange } = this.props;
        const exchangeId = exchange && exchange.id;
        // toggleLoader will submit action based on current exchange status
        // either intiateExchange or verifyExchange
        this.toggleLoader(true, exchangeAction);
        return this.props[ exchangeAction ](id, exchangeId);
    }


    render() {
        const {
            feedback,
            exchange,
            currentClass
        } = this.props;
        const { showFeedback, loading, action } = this.state;
        const exchangeAction = this.state.exchangeActions[ action ];

        if (!currentClass || !currentClass.id) {
            return null;
        }

        return (
            <div className='class-portal-tab'>
                <LoaderWithText
                    loading={loading}
                    text={exchangeAction}
                />
                <Status
                    onExchangeActionClick={this.onExchangeActionClick.bind(this)}
                    status={exchange && exchange.status}
                    classIsVerified={exchange.classIsVerified}
                    exchange={exchange}
                />
                { showFeedback && (feedback && feedback.type) ?
                    <Feedback {...feedback} /> : null }
                <GoogleMap />
            </div>
        );
    };
};

export default connect(null, { initiateExchange, verifyExchange })(Progress);
