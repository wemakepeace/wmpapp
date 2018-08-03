import React from 'react';
import { connect } from 'react-redux';
import FormContainer from '../../../reusables/FormContainer';
import CustomButton from '../../../reusables/CustomButton';
import { changePassword } from '../../../../redux/actions/teacher';
import { Input } from '../../../reusables/Input';

const ChangePasswordButton = CustomButton({ name: 'Change Password' });
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

const Form = FormContainer({ Input, CustomButton: ChangePasswordButton });

const ResetPassword = ({ changePassword }) => {
    const onSubmit = (passwords) => changePassword(passwords)

    return (
        <div>
            <p>Password must be at least 8 characters long.</p>
            <Form onSubmit={onSubmit} inputs={inputs} />
        </div>
    );
}


export default connect(null, { changePassword })(ResetPassword);
