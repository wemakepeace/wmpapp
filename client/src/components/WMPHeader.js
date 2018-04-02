import React from 'react';
import { connect } from 'react-redux';


const WMPHeader = (props) => {
    return (
        <div className='title-container'>
            <div className='heading'>
                <div className='title'><h1>WE</h1></div>
                <div className='title'><h1>MAKE</h1></div>
                <div className='title'>
                    <h1><span className='title-span'>PEACE LETTERS</span></h1>
                </div>
            </div>
            <div className='logged-in'>Logged in as {props.teacher.firstName}
            {props.classes && props.classes.currentClass
                ? <span> for class {props.classes.list[props.classes.currentClass].name}</span>
                : null
            }
            </div>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        teacher: state.teacher,
        classes: state.classes
    }
}

export default connect(mapStateToProps)(WMPHeader);

