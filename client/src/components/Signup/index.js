import React from 'react';
import { connect } from 'react-redux';
import FormContainer from '../reusables/FormContainer';
import CustomButton from '../reusables/CustomButton';
import { signup } from '../../redux/actions/teacher';
import { LoginSignupInput } from '../reusables/LoginSignupInput';

const SignupButton = CustomButton({ name: 'SIGNUP' });
const inputs = [
    {
        label: 'FIRST NAME',
        name: 'firstName'
    },
    {
        label: 'LAST NAME',
        name: 'lastName'
    },
    {
        label: 'EMAIL',
        name: 'email'
    },
    {
        label: 'PASSWORD',
        type: 'password',
        name: 'password'
    },
    {
        label: 'CONFIRM PASSWORD',
        type: 'password',
        name: 'confirmPassword'
    }
];
const Form = FormContainer({ Input: LoginSignupInput, CustomButton: SignupButton });

const SignupContainer = ({ signup }) => {
    const onSubmit = (data) => signup(data);

    return (
        <div className='login-signup-form'>
            <div className='form-container'>
                <Form onSubmit={onSubmit} inputs={inputs} />
            </div>
        </div>
    );
}

export default connect(null, { signup })(SignupContainer);
