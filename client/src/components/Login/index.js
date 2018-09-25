import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormContainer from '../reusables/FormContainer';
import CustomButton from '../reusables/CustomButton';
import { login } from '../../redux/actions/auth';
import { LoginSignupInput } from '../reusables/LoginSignupInput';

const LoginButton = CustomButton({ name: 'LOGIN' });

const inputs = [
    {
        label: 'EMAIL',
        type: 'email',
        name: 'email'
    },
    {
        label: 'PASSWORD',
        type: 'password',
        name: 'password'
    }
];

const Form = FormContainer({ Input: LoginSignupInput, CustomButton: LoginButton });

const LoginContainer = ({ login, match, history, feedback }) => {
    const onSubmit = (credentials) => {
        return login(credentials)
            .then(({ feedback: { type } }) => {
                if (type === 'success') {
                    history.push('/profile/overview');
                }
            });
    }

    return (
        <div className='login-signup-form'>
            <div className='form-container'>
                <Form onSubmit={onSubmit} inputs={inputs} />
                <div style={{padding: '0px 0px 20px 20px'}}>
                    <Link to='reset'>Forgot your password?</Link>
                </div>
            </div>
        </div>
    );
}

export default connect(null, { login })(LoginContainer);
