import React from 'react';
import { connect } from 'react-redux';


const WMPHeader = (props) => (
    <div className='title-container'>
        <div className='heading'>
            <div className='title'><h1>WE</h1></div>
            <div className='title'><h1>MAKE</h1></div>
            <div className='title'>
                <h1><span className='title-span'>PEACE LETTERS</span></h1>
            </div>
        </div>
        <div className='logged-in'>Logged in as {props.teacher.firstName}
        {props.teacher && props.teacher.currentClass
            ? <span>for class {currentClass.name}</span>
            : null
        }
        </div>
    </div>
);


const mapStateToProps = state => {
    return {
        teacher: state.teacher
    }
}

export default connect(mapStateToProps)(WMPHeader);

