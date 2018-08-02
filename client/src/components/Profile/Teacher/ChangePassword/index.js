import React from 'react';
import { connect } from 'react-redux';
import FormContainer from '../../../reusables/FormContainer';
import CustomButton from '../../../reusables/CustomButton';
import Feedback from '../../../Feedback';
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

const ResetPassword = ({ changePassword, feedback }) => {
    const onSubmit = (passwords) => changePassword(passwords)

    return (
        <div>
            <p>Password must be at least 8 characters long.</p>
            <Form onSubmit={onSubmit} inputs={inputs} />
            <Feedback {...feedback} />
        </div>
    );
}

const mapStateToProps = ({ feedback }) => {
    return { feedback }
}


export default connect(mapStateToProps, { changePassword })(ResetPassword);
