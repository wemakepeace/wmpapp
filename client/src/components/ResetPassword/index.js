import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Header,
    Image,
    Message,
    Button
} from 'semantic-ui-react';
import FormContainer from '../reusables/FormContainer';
import CustomButton from '../reusables/CustomButton';
import { LoaderWithText } from '../reusables/LoaderWithText';
import Feedback from '../Feedback';
import { resetPasswordWithToken } from '../../redux/actions/teacher';
import { Input } from '../reusables/Input';

const ResetPasswordButton = CustomButton({ name: 'Reset Password' });
const Form = FormContainer({ Input, CustomButton: ResetPasswordButton });
const inputs = [
    {
        label: 'New password',
        type: 'password',
        name: 'password'
    },
    {
        label: 'Confirm password',
        type: 'password',
        name: 'confirmPassword'
    }
];

class ResetPassword extends Component {
    state = {
        showFeedback: false,
        loading: false
    }

    componentWillReceiveProps({ feedback }) {
        if (feedback) {
            this.setState({ showFeedback: true, loading: false });
        }
    }

    toggleLoader() {
        this.setState({ loading: !this.state.loading });
    }

    onSubmit(passwords) {
        this.toggleLoader();
        const token = this.props.match.params.token;
        return this.props.resetPasswordWithToken(passwords, token)
    }

    render () {
        const { feedback, resetPasswordWithToken } = this.props;
        const { showFeedback, loading } = this.state;

        return (
            <div className='centered-outer-div'>
                <LoaderWithText
                    loading={loading}
                    text='Resetting your password...'
                />
                <div
                    className='centered-inner-div'
                    style={{width: '500px', padding: '10px'}}>
                    <Header as='h2'>
                        <Image src='../../../assets/logos/WMPlogo_transparent.png' />
                                {' '}Reset Password
                    </Header>
                    {   showFeedback && (feedback && feedback.type === 'success')
                        ?   <Message>
                                Your password has been successfully reset. <br />
                                Go to <Link to='/'>profile</Link>.
                            </Message>
                        :   <div>
                                <p>Password must be at least 8 characters long.</p>
                                <Form onSubmit={this.onSubmit.bind(this)} inputs={inputs} />
                            </div>
                    }
                    { showFeedback && (feedback && feedback.type === 'error')
                        ? <Feedback {...feedback} /> : null }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ feedback }) => {
    return { feedback }
}


export default connect(mapStateToProps, { resetPasswordWithToken })(ResetPassword);
