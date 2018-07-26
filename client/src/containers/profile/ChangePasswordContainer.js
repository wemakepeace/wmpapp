import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import Feedback from '../../components/Feedback';
import { changePassword, resetPasswordWithToken } from '../../redux/actions/teacher';
import { Input } from '../../components/profile/Input';
import { ChangePassword } from '../../components/profile/ChangePassword';
import { ResetPassword } from '../../components/ResetPassword';

class ChangePasswordContainer extends Component {
    constructor(props) {
        super(props);
        this.state = this.getDefaultState(props);
    }

    getDefaultState(props) {
        const { form } = props;

        const change = {
            oldPassword: '',
            password: '',
            confirmPassword: '',
        }
        const reset = {
            password: '',
            confirmPassword: '',
        }
        return { ...form, showFeedback: false }
    }

    onInputChange = (ev, type) => this.setState({[type]: ev.target.value, showFeedback: false })

    onChangePassword = () => {
        if (this.props.form === 'change') {
            this.props.changePassword(this.state)
        } else {
            const token = this.props.match.params.token;
            this.props.resetPasswordWithToken(this.state, token)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback) {
            this.setState({ showFeedback: true });
        }
    }

    render() {
        const { feedback, form } = this.props;
        const { showFeedback } = this.state;
        const Form = form === 'change' ? ChangePassword : ResetPassword;

        return (
            <div className=''>
                { showFeedback && (feedback && feedback.type === 'success') ?
                <h4> Your password has been changed.</h4> :
                <div>
                    <Form onInputChange={this.onInputChange} feedback={feedback}/>
                    <Button
                        className='large-custom-btn'
                        size='large'
                        onClick={this.onChangePassword}>
                        Change Password
                    </Button>
                    { showFeedback && (feedback && feedback.type) && form !== 'change'
                        ? <Feedback {...feedback} />
                        : null }
                </div>
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        feedback: state.feedback,
        teacher: state.teacher
    }
};

export default connect(mapStateToProps, { changePassword, resetPasswordWithToken })(ChangePasswordContainer);
