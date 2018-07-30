import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Grid, Header, Image, Form, Segment, Message, Button, Menu } from 'semantic-ui-react'
import Feedback from '../components/Feedback';

import { sendResetPasswordLink } from '../redux/actions/teacher';

class ResetPasswordRequestContainer extends Component {
    state = {
        email: '',
        showFeedback: false
    }

    onInputChange = (ev, type) => this.setState({[type]: ev.target.value})

    onForgotPassword = () => {
        this.props.sendResetPasswordLink({ email: this.state.email });
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback) {
            this.setState({ showFeedback: true });
        }
    }

    render() {
        const { feedback } = this.props;
        const { showFeedback } = this.state;

        return (
            <Grid
                textAlign='center'
                style={{ height: '100%', width: '100%' }}
                verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        <Image src='../../../assets/logos/WMPlogo_transparent.png' />
                                {' '}Request Reset Password
                    </Header>
                    {   feedback && feedback.type === 'SUCCESS'
                    ?   null
                    :   <Form size='large'>
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

const mapStateToProps = (state) => {
    return {
        feedback: state.feedback
    }
};

export default connect(mapStateToProps, { sendResetPasswordLink })(ResetPasswordRequestContainer);
