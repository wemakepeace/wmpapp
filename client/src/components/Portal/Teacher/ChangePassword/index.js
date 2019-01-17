import React from 'react';
import FormContainer from '../../../reusables/FormContainer';
import CustomButton from '../../../reusables/CustomButton';
import { Input } from '../../../reusables/Input';

const ChangePasswordButton = CustomButton({ name: 'Change Password' });
const Form = FormContainer({ Input, CustomButton: ChangePasswordButton });

const ChangePassword = ({ onChangePassword }) => {
    const onSubmit = (passwords) => onChangePassword(passwords)
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

    return (
        <div>
            <p>Password must be at least 8 characters long.</p>
            <Form onSubmit={onSubmit} inputs={inputs} />
        </div>
    );
}

export default ChangePassword;
