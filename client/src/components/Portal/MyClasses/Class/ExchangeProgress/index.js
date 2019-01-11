import React, { Component } from 'react';
import { connect } from 'react-redux';
import Feedback from '../../../../Feedback';
import { Status } from './Status';
import { initiateExchange, verifyExchange } from '../../../../../redux/actions/exchange';
import { LoaderWithText } from '../../../../reusables/LoaderWithText';


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

    toggleLoader(bool, action) {
        if (bool !== undefined) {
            this.setState({ loading: bool, action });
        } else {
            this.setState({ loading: !this.state.loading, action });
        }
    }

    componentWillReceiveProps() {
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
        const { exchange } = this.props;
        const exchangeId = exchange && exchange.id;
        // toggleLoader will submit action based on current exchange status
        // either intiateExchange or verifyExchange
        this.toggleLoader(true, exchangeAction);
        return this.props[ exchangeAction ](id, exchangeId);
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback && feedback.type === 'error') {
            this.setState({ showFeedback: true });
        }
        this.toggleLoader(false, "");

    }

    render() {
        const {
            feedback,
            exchange,
            currentClass
        } = this.props;
        const { showFeedback } = this.state;
        const { loading, action } = this.state;
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

export default connect(mapStateToProps, { initiateExchange, verifyExchange })(Progress);
