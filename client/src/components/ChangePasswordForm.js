import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Grid, Header, Image, Form, Segment, Message, Button, Menu } from 'semantic-ui-react'

import Feedback from './Feedback';

// import { resetPassword } from '../redux/actions/teacher';

class ChangePasswordForm extends Component {
    state = {
        oldPassword: '',
        password1: '',
        password2: '',
        showFeedback: false,

    }

    onInputChange = (ev, type) => this.setState({[type]: ev.target.value})

    onForgotPassword = () => {
        // const token = this.props.match.params.token
        // this.props.resetPassword(this.state, token)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback) {
            this.setState({ showFeedback: true });
        }
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
                    <Header as='h2' textAlign='center'>Change Password</Header>
                    {   feedback && feedback.type === 'SUCCESS'
                    ?   null
                    :   <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Current password'
                                    type='password'
                                    onChange={ (ev) => this.onInputChange(ev, 'oldPassword')}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='New password'
                                    type='password'
                                    onChange={ (ev) => this.onInputChange(ev, 'password1')}
                                />
                                <Form.Input
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
                                    onClick={this.onForgotPassword}>Change Password</Button>
                            </Segment>
                        </Form>
                    }
                    { showFeedback && (feedback && feedback.type)
                    ? <Feedback {...feedback} />
                    : null }
                    { showFeedback && (feedback && (feedback.type === 'success'))
                    ? <Button
                        name='Go to Portal'
                        as={Link}
                        className='large-custom-btn'
                        size='large'
                        to='/exchange' />
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

export default connect(mapStateToProps)(ChangePasswordForm);
