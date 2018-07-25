import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Image, Form, Segment, Button, Loader } from 'semantic-ui-react'
import Feedback from './Feedback';

import { sendResetPasswordLink } from '../redux/actions/teacher';

class ForgotPasswordForm extends Component {
    state = {
        email: '',
        showFeedback: false,
        loading: false
    }

    onInputChange = (ev, type) => this.setState({[type]: ev.target.value})

    onForgotPassword = () => {
        this.props.sendResetPasswordLink({ email: this.state.email });
        this.setState({ loading: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback) {
            this.setState({ showFeedback: true, loading: false });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        const { feedback } = this.props;
        const { showFeedback, loading } = this.state;

        return (
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        <Image src='../../../assets/logos/WMPlogo_transparent.png' />
                                {' '}Request Reset Password
                    </Header>
                    {   feedback && feedback.type === 'success' ?
                        null :
                        loading ?
                            <Loader active={loading} inline='centered'>
                                Sending reset password request
                            </Loader> :
                            <Form size='large'>
                                <Segment stacked>
                                    <Form.Input
                                        fluid
                                        icon='mail'
                                        iconPosition='left'
                                        placeholder='E-mail address'
                                        onChange={ (ev) => this.onInputChange(ev, 'email')}
                                    />
                                    <Button
                                        className='large-custom-btn'
                                        fluid size='large'
                                        onClick={this.onForgotPassword}>Send Reset Password Link</Button>
                                </Segment>
                            </Form>
                    }
                    { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
                </Grid.Column>
            </Grid>
        )
    };
};

const mapStateToProps = ({ feedback }) => {
    return { feedback }
};

export default connect(mapStateToProps, { sendResetPasswordLink })(ForgotPasswordForm);
