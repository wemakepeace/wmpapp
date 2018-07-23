import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Grid, Header, Image, Form, Segment, Message, Button, Menu } from 'semantic-ui-react';
import Feedback from './Feedback';
import { resetPasswordWithToken } from '../redux/actions/teacher';

class ResetPasswordForm extends Component {
    state = {
        password1: '',
        password2: '',
        showFeedback: false
    }

    onInputChange = (ev, type) => this.setState({[type]: ev.target.value})

    onForgotPassword = () => {
        const token = this.props.match.params.token
        this.props.resetPasswordWithToken(this.state, token)
    }


    componentWillReceiveProps({ feedback }) {
        if (feedback) {
            this.setState({ showFeedback: true });
        }

        if (feedback.type === 'success' && feedback.messages[ 0 ] === 'Your password has been reset. We are redirecting you to your profile.') {
            return this.redirectToProfile();
        }

    }

    redirectToProfile() {
        return setTimeout(() => {
            return this.props.history.push('/profile/overview');
        }, 4000);
    }

    render() {
        const { feedback } = this.props;
        const { showFeedback } = this.state;

        return (
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        <Image src='../../../assets/logos/WMPlogo_transparent.png' />
                                {' '}Reset Password
                    </Header>
                    {   feedback && feedback.type === 'SUCCESS'
                    ?   null
                    :   <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='New password'
                                    type='password'
                                    onChange={ (ev) => this.onInputChange(ev, 'password1')}
                                /><Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm new password'
                                    type='password'
                                    onChange={ (ev) => this.onInputChange(ev, 'password2')}
                                />
                                <Button
                                    className='large-custom-btn'
                                    fluid size='large'
                                    onClick={this.onForgotPassword}>Reset Password</Button>
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

const mapStateToProps = (state) => {
    return {
        feedback: state.feedback,
        teacher: state.teacher
    }
};

export default connect(mapStateToProps, { resetPasswordWithToken })(ResetPasswordForm);
