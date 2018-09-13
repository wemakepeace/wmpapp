import React from 'react';
import CustomButton from '../reusables/CustomButton';

const NoAccess = (props) => {
    const redirectToHome = () => props.history.push('/');
    const Button = CustomButton({ name: 'Go to Home Page'});
    return (
        <div className='centered-outer-div'>
            <div className='centered-inner-div box-border'>
                <h1>You must be logged in to access this page</h1>
                <Button onSubmit={redirectToHome} />
            </div>
        </div>
    )
};

export default NoAccess;
