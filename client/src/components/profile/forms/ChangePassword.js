import React from 'react';
import { connect } from 'react-redux';
import FormContainer from '../../../containers/FormContainer';
import Feedback from '../../Feedback';
import { changePassword } from '../../../redux/actions/teacher';

const inputs = [
    {
        label: 'Current password',
        type: 'password',
        name: 'oldPassword'
    },
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

const ResetPassword = ({ changePassword, feedback }) => {
    const onSubmit = (passwords) => changePassword(passwords)

    return (
        <div>
            <p>Password must be at least 8 characters long.</p>
            <Form onSubmit={onSubmit} />

            <Feedback {...feedback} />
        </div>
    );
}

const mapStateToProps = ({ feedback }) => {
    return { feedback }
}


export default connect(mapStateToProps, { changePassword })(ResetPassword);
