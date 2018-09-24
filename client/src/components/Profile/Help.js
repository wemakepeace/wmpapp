import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, TextArea } from 'semantic-ui-react';
import { LoaderWithText } from '../reusables/LoaderWithText';
import SelectClass from '../reusables/SelectClassDropdown';
import { fetchClass } from '../../redux/actions/class';
import { sendFeedback } from '../../redux/actions/shared';
import { sendSupportMessage } from '../../redux/actions/teacher';

const supportActions = {
    sendingMessage: 'Submitting your message...'
};

class Help extends Component {
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

        if (!currentClass || !currentClass.id) {
            return this.props.sendFeedback({ type: 'error', messages: ['You have to select a class'] })
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
                        <h2>Questions & Answers</h2>
                        <p>Please look through to see if any questions you may have are answered below.</p>
                    </div>
                    <hr style={{margin: '20px 0'}} />
                    <div>
                        <p><b>My class has completed an exchange. Can I sign the class up again?</b></p>
                        <p>Absolutely. Your classes are welcome to participate as many times as they want.</p>
                        <p className=''>
                            <b>I signed my class up a while ago, but the no exchange match has been made. What can I do?</b>
                        </p>
                        <p className=''>
                            This means that there has not yet been another class that has signed up that matches the criteria of your class. The criterias are that the two classes must be in the same age group and must be registered for the same term. If your class has not been matched by the end of a term, you will be notified by mail. You can then register your class for the next term and re-initiate the exchange.
                        </p>
                        <p className=''>
                            <b>My class has been matched and the exchange is confirmed by both classes, but the other teacher is unresponsive. What can I do?</b>
                        </p>
                        <p className=''>
                            In this case, we recommend that you cancel the exchange (on the Overview page) and re-initiate the your class for a new exchange. Unfortunately, there is little we can do to change a circumstance of this kind, though we know that there will be other teachers and classes signing up in the future.
                        </p>
                    </div>
                    <hr />
                    <h2>Need our assistance?</h2>
                    <p>If your class is enrolled in an ongoing exchange, we always encourage you to reach out to the other class' teacher before getting in touch with us.</p>
                    <p>If you do need our assistance, feel free to submit your problem, and we will get back to you as soon as we are able to.</p>
                    <Form>
                        <Form.Field>
                            <label>Select the class your question is related to</label>
                            <SelectClass
                                onClassSelect={({ value }) => fetchClass(value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                type='text'
                                onChange={(ev) => this.setState({ title: ev.target.value })}
                                placeholder='Brief description of your inquiry'
                            />
                        </Form.Field>
                        <Form.Field>
                            <TextArea
                                onChange={(ev) => this.setState({ message: ev.target.value })}
                                placeholder='Explain to us in detail what you are wondering about.'
                            />
                        </Form.Field>
                        <Button
                            type='submit'
                            onClick={this.onSubmitMessage.bind(this)}
                        >Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ teacher, currentClass, exchange }) => {
    return {
        teacher,
        currentClass,
        exchange
    };
};

export default connect(mapStateToProps, { fetchClass, sendSupportMessage, sendFeedback })(Help);
