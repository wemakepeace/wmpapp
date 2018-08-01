import React from 'react';
import { connect } from 'react-redux';
import FormContainer from '../../containers/FormContainer';
import Feedback from '../Feedback';
import { resetPasswordWithToken } from '../../redux/actions/teacher';

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

const state = { password: '', confirmPassword: '' };
const Form = FormContainer({ inputs, state });

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
            <Form onSubmit={onSubmit} />
            <Feedback {...feedback} />
        </div>
    );
}

const mapStateToProps = ({ feedback }) => {
    return { feedback }
}


export default connect(mapStateToProps, { resetPasswordWithToken })(ResetPassword);
