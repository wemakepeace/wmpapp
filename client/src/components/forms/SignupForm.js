import React from 'react';

const SignupForm = ({ onChange }) => {
    return (
        <div className='login-form'>
            <div className='form-row'>
                <input
                    placeholder='FIRST NAME'
                    name='firstname'
                    onChange={(ev)=> onChange(ev, 'firstName')}/>
            </div>
            <div className='form-row'>
                <input
                    placeholder='LAST NAME'
                    name='lastname'
                    onChange={(ev) =>  onChange(ev, 'lastName')}/>
            </div>
            <div className='form-row'>
                <input
                    placeholder='EMAIL'
                    name='email'
                    onChange={(ev) =>  onChange(ev, 'email')}/>
            </div>
            <div className='form-row'>
                <input
                    placeholder='PASSWORD'
                    name='password'
                    type='password'
                    onChange={(ev) =>  onChange(ev, 'password')}/>
            </div>
            <div className='form-row'>
                <input
                    placeholder='CONFIRM PASSWORD'
                    name='confirmpassword'
                    type='password'
                    onChange={(ev) =>  onChange(ev, 'confirmPassword')}/>
            </div>
        </div>
    );
}

export default SignupForm;
