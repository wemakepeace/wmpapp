import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = ({ onChange }) => {

    return (
        <div>
            <div className='form-row'>
                <input
                    placeholder='USERNAME'
                    name='email'
                    onChange={(ev) => onChange(ev, 'email')}/>
            </div>
            <div className='form-row'>
                <input
                    placeholder='PASSWORD'
                    name='password'
                    type='password'
                    onChange={(ev) => onChange(ev, 'password')}/>
            </div>
            <Link to='/reset'>Forgot password?</Link>
        </div>
    );
}

export default LoginForm;
