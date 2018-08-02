import React from 'react';
import { connect } from 'react-redux';
import FormContainer from './FormContainer';
import Feedback from '../components/Feedback';
import { resetPasswordWithToken } from '../redux/actions/teacher';
import { Input } from '../components/profile/Input';
import CustomButton from '../components/CustomButton';

const ResetPasswordButton = CustomButton({ name: 'Reset Password' });
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

const Form = FormContainer({ Input, CustomButton: ResetPasswordButton });

const ResetPassword = ({ resetPasswordWithToken, match, history, feedback }) => {
    const onSubmit = (passwords) => {
        const token = match.params.token;
        return resetPasswordWithToken(passwords, token)
        .then(({ feedback: { type } }) => {
            if (type === 'success') {
                history.push('/profile/overview');
            }
        });
    }

    return (
        <div>
            <h3>Reset Password</h3>
            <p>Password must be at least 8 characters long.</p>
            <Form onSubmit={onSubmit} inputs={inputs} />
            <Feedback {...feedback} />
        </div>
    );
}

const mapStateToProps = ({ feedback }) => {
    return { feedback }
}


export default connect(mapStateToProps, { resetPasswordWithToken })(ResetPassword);
