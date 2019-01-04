import React from 'react';
import SubHeader from './SubHeader';

const HeaderContainer = (props) => {

    return (
        <div>
        <div className='title-container'>
            <div className='heading'>
                <div className='title'><h1>WE</h1></div>
                <div className='title'><h1>MAKE</h1></div>
                <div className='title'>
                    <h1><span className='title-span'>PEACE LETTERS</span></h1>
                </div>
            </div>
        </div>
        <SubHeader className='mobile-subheader' {...props} />
        </div>
    );
}


export default HeaderContainer;
