import React from 'react';
import { connect } from 'react-redux';
import FormContainer from './FormContainer';
import Feedback from '../components/Feedback';
import { signup } from '../redux/actions/teacher';
import { LoginSignupInput } from '../components/LoginSignupInput';
import CustomButton from '../components/CustomButton';

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

const SignupContainer = ({ signup, feedback }) => {
    const onSubmit = (data) => {
        return signup(data)
            .then(({ feedback: { type } }) => {
                if (type === 'success') {
                    history.push('/profile/overview');
                }
            });
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} inputs={inputs} />
            <Feedback {...feedback} />
        </div>
    );
}

const mapStateToProps = ({ feedback }) => {
    return { feedback }
}


export default connect(mapStateToProps, { signup })(SignupContainer);
