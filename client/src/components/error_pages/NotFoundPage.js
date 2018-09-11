import React from 'react';
import CustomButton from '../reusables/CustomButton';

const NotFoundPage = (props) => {
    const redirectToHome = () => props.history.push('/')
    const Button = CustomButton({ name: 'Go to Home Page'});

    return (
        <div className='centered-outer-div'>
            <div className='centered-inner-div box-border'>
                <h1>Oops! This page does not exist.</h1>
                <Button onSubmit={redirectToHome} />
            </div>
        </div>
    );
};

export default NotFoundPage;
