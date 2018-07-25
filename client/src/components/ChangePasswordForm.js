import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import Feedback from './Feedback';
import { changePassword } from '../redux/actions/teacher';

class ChangePasswordForm extends Component {
    state = {
        oldPassword: '',
        password: '',
        confirmPassword: '',
        showFeedback: false
    }

    onInputChange = (ev, type) => this.setState({[type]: ev.target.value, showFeedback: false })

    onChangePassword = () => this.props.changePassword(this.state)

    componentWillReceiveProps(nextProps) {
        if (nextProps.feedback) {
            this.setState({ showFeedback: true });
        }
    }

    render() {
        const { feedback } = this.props;
        const { showFeedback, oldPassword, password, confirmPassword } = this.state;

        return (
            <div className='profile-segment'>
                <p>Password must be at least 8 characters long.</p>
                <div className='form-row'>
                    <label className='form-label'>Current password</label>
                    <span className='form-input-span'>
                        <input
                            value={oldPassword || ''}
                            className='form-input'
                            type='password'
                            placeholder='Please type current password'
                            name='oldPassword'
                            onChange={(ev)=>this.onInputChange(ev, 'oldPassword')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>New password</label>
                    <span className='form-input-span'>
                        <input
                            value={password || ''}
                            className='form-input'
                            type='password'
                            placeholder=''
                            name='password'
                            onChange={(ev)=>this.onInputChange(ev, 'password')}/>
                    </span>
                </div>
                <div className='form-row'>
                    <label className='form-label'>Confirm new password</label>
                    <span className='form-input-span'>
                        <input
                            value={confirmPassword || ''}
                            className='form-input'
                            type='password'
                            placeholder=''
                            name='confirmPassword'
                            onChange={(ev)=>this.onInputChange(ev, 'confirmPassword')}/>
                    </span>
                </div>
                <Button
                    className='large-custom-btn'
                    size='large'
                    onClick={this.onChangePassword}>
                    Change Password
                </Button>
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

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);
