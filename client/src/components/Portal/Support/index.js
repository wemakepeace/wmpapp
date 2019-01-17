import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoaderWithText } from '../../reusables/LoaderWithText';
import { fetchClass } from '../../../redux/actions/class';
import { sendFeedback } from '../../../redux/actions/shared';
import { sendSupportMessage } from '../../../redux/actions/teacher';
import SupportForm from './SupportForm';
import { QandA } from './QandA';

const supportActions = {
    sendingMessage: 'Submitting your message...'
};

class Support extends Component {
    state = {
        loading: false,
        action: '',
        title: '',
        message: ''
    }

    toggleLoader(bool, action) {
        if (bool !== undefined) {
            this.setState({ loading: bool, action })
        } else {
            this.setState({ loading: !this.state.loading, action })
        }
    }

    onSubmitMessage() {
        const { teacher, exchange, currentClass } = this.props;
        const { title, message } = this.state;
        const content = { teacher, exchange, currentClass, message, title };

        if (!currentClass || !currentClass.id || !title || !message) {
            return this.props.sendFeedback({ type: 'error', messages: ['You have to fill in all fields before you can submit your message.'] })
        }

        this.toggleLoader(true, 'sendingMessage');
        this.props.sendSupportMessage(content);
    }

    componentWillReceiveProps() {
        this.toggleLoader(false, "");
    }

    render() {
        const { loading, action } = this.state;
        const { teacher, exchange, currentClass, fetchClass } = this.props;
        const { firstName } = teacher;
        const supportAction = supportActions[ action ];

        return (
            <div>
                <LoaderWithText
                    loading={loading}
                    text={supportAction}
                />
                <div className='profile-segment'>
                    <div>
                        <h3>Questions & Answers</h3>
                        <p>Please look through to see if any questions you may have are answered below.</p>
                    </div>
                    <hr style={{margin: '20px 0'}} />
                    <QandA />
                    <hr style={{margin: '20px 0'}} />
                    <SupportForm
                        onSubmitMessage={this.onSubmitMessage.bind(this)}
                        fetchClass={fetchClass}
                        setState={this.setState.bind(this)}
                    />
                </div>
            </div>
        );
    }
}


export default connect(null, { fetchClass, sendSupportMessage, sendFeedback })(Support);
